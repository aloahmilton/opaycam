# Home Screen Design Specifications

## Overview
The home screen is the primary hub for all OpayCam services, designed for quick access to frequently used features and account overview.

## Layout Structure

### Header Section
- **Height**: 180px
- **Background**: Deep Corporate Blue gradient (top to bottom: #003366 to #004488)
- **Content**:
  - Welcome message: "Hello, [User Name]" (18px, white, SemiBold)
  - Account balance display (32px, white, Bold)
  - Eye icon to toggle balance visibility
  - Profile avatar (top-right, 40px circle)

### Quick Actions Grid
- **Layout**: 4x2 grid (4 columns, 2 rows)
- **Spacing**: 16px between items
- **Item Design**:
  - Size: ~80px x 80px
  - Background: White card with subtle shadow
  - Border Radius: 12px
  - Icon: 32px, positioned center-top
  - Label: 14px, centered below icon

#### Primary Quick Actions (Row 1)
1. **Send Money** (Yellow icon)
2. **Receive Money** (Blue icon)
3. **Pay Bills** (Orange icon)
4. **Airtime** (Green icon)

#### Secondary Quick Actions (Row 2)
5. **Savings** (Purple icon)
6. **Loans** (Teal icon)
7. **Bank Transfer** (Blue icon)
8. **More** (Gray icon)

### Recent Transactions Section
- **Title**: "Recent Transactions" (20px, SemiBold, Blue)
- **See All Link**: Top-right (14px, Medium Blue)
- **Transaction Cards**:
  - White background, 12px border radius
  - Left: Icon (40px circle) + Transaction type & recipient (16px/14px)
  - Right: Amount (16px, Bold) + Date (12px, gray)
  - Divider between items (1px, light gray)
  - Show last 5 transactions

### Promotional Banner (Optional)
- **Position**: Between Quick Actions and Transactions
- **Height**: 120px
- **Design**: Rounded card with promotional content
- **Dismissable**: Close icon (top-right)

## Color Usage
- **Header**: Deep Blue gradient
- **Background**: Light gray (#F5F5F5)
- **Cards**: White (#FFFFFF)
- **Primary accents**: Yellow (#FFD700)
- **Text primary**: Deep Blue (#003366)
- **Text secondary**: Gray (#666666)

## Interaction States

### Quick Action Buttons
- **Default**: White background, colored icon
- **Pressed**: Light yellow background (#FFF9E6), scale 0.95
- **Disabled**: Gray icon, reduced opacity (0.5)

### Transaction Items
- **Default**: White background
- **Pressed**: Light gray background (#F9F9F9)
- **Long Press**: Show context menu (Receipt, Support)

## Accessibility
- **Touch targets**: Minimum 44x44px for all interactive elements
- **Text contrast**: WCAG AA compliant (4.5:1 minimum)
- **Screen reader labels**: Descriptive labels for all actions
- **Balance privacy**: Option to hide sensitive information

## Navigation
- **Bottom Tab Bar** (Always visible):
  - Home (Yellow when active)
  - History
  - Savings
  - Profile
  - Height: 60px + safe area

## Loading States
- **Initial Load**: Skeleton screens for cards and transactions
- **Pull to Refresh**: Yellow spinner at top
- **Empty State**: Friendly illustration + "Start your first transaction"

## Error States
- **Network Error**: Banner with retry button
- **Balance Fetch Error**: Show cached balance with warning icon
- **Transactions Load Error**: Gray cards with reload prompt

## Target Age Groups

### Primary (25-45 years)
- **Tech Comfort**: Moderate to high
- **Financial Needs**: Bill payments, transfers, savings, loans
- **Design Preference**: Clean, efficient, professional
- **Key Features**: Quick access, transaction history, savings goals

### Secondary (18-24 years)
- **Tech Comfort**: High
- **Financial Needs**: Airtime, transfers, peer-to-peer payments
- **Design Preference**: Modern, vibrant, social
- **Key Features**: QR payments, split bills, rewards

### Growing (45+ years)
- **Tech Comfort**: Low to moderate
- **Financial Needs**: Basic transfers, bill payments
- **Design Preference**: Clear, simple, large text
- **Key Features**: Voice assistance, large buttons, step-by-step guides