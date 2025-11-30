import * as fs from 'fs';
import * as glob from 'glob';

const pattern = 'src/**/*.tsx';

function replaceColorImport(content: string): string {
    // Replace old color imports with new theme imports
    const colorImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]\.\.\/theme\/colors['"]/g;

    return content.replace(colorImportRegex, (match, imports) => {
        const parts = imports.split(',').map((s: string) => s.trim());
        return `import { ${parts.join(', ')} } from '../theme';`;
    });
}

// Add legacyColors import if not present
function addLegacyColorsImport(content: string): string {
    if (!content.includes("legacyColors")) {
        const lastImportIdx = content.lastIndexOf('import');
        const insertPos = content.indexOf('\n', lastImportIdx) + 1;
        content = content.slice(0, insertPos) + "import { legacyColors } from '../theme/legacyColors';\n" + content.slice(insertPos);
    }
    return content;
}

function insertThemeHook(content: string): string {
    // Insert useTheme, legacyColors, and memoised styles after language hook (if present)
    const langHookRegex = /const\s*\{[^}]*\}\s*=\s*useLanguage\(\);/;
    if (langHookRegex.test(content)) {
        const insertion = `    const { theme } = useTheme();\n    const colors = legacyColors(theme);\n    const styles = useMemo(() => createStyles(colors), [colors]);`;
        // Remove any existing styles definition that may conflict
        const stylesRegex = /const\s+styles\s*=\s*useMemo\([^;]*\);/g;
        let newContent = content.replace(stylesRegex, '');
        return newContent.replace(langHookRegex, (match) => `${match}\n${insertion}`);
    }
    // Fallback: insert after the first useState declaration
    const useStateRegex = /const\s+\[.*?\]\s*=\s*useState\([^;]*\);/;
    if (useStateRegex.test(content)) {
        const insertion = `    const { theme } = useTheme();\n    const colors = legacyColors(theme);\n    const styles = useMemo(() => createStyles(colors), [colors]);`;
        return content.replace(useStateRegex, (match) => `${match}\n${insertion}`);
    }
    return content;
}

function replaceCreateStylesSignature(content: string): string {
    return content.replace(/const\s+createStyles\s*=\s*\(colors:\s*ThemeColors\)\s*=>\s*StyleSheet\.create\(/g,
        'const createStyles = (colors: LegacyThemeColors) => StyleSheet.create(');
}

function ensureImports(content: string): string {
    // Ensure useMemo is imported from React
    if (!content.includes('useMemo')) {
        const reactImportIdx = content.indexOf("import React");
        const afterReact = content.indexOf('\n', reactImportIdx) + 1;
        content = content.slice(0, afterReact) + "import { useMemo } from 'react';\n" + content.slice(afterReact);
    }
    // Ensure useTheme is imported from ThemeContext
    if (!content.includes('useTheme')) {
        const lastImportIdx = content.lastIndexOf('import');
        const insertPos = content.indexOf('\n', lastImportIdx) + 1;
        content = content.slice(0, insertPos) + "import { useTheme } from '../context/ThemeContext';\n" + content.slice(insertPos);
    }
    return content;
}

function processFile(filePath: string) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = replaceColorImport(content);
    content = addLegacyColorsImport(content);
    content = insertThemeHook(content);
    content = replaceCreateStylesSignature(content);
    content = ensureImports(content);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed ${filePath}`);
}

glob(pattern, {}, (err, files) => {
    if (err) {
        console.error('Glob error', err);
        process.exit(1);
    }
    files.forEach(processFile);
});
