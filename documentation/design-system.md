# Community Food Sharing - Design System

## 🎨 Color Palette

### Primary Colors
- Yellow (Brand Color)
  ```css
  --primary-yellow-500: #EAB308;  /* Main brand color */
  --primary-yellow-600: #CA8A04;  /* Hover state */
  --primary-yellow-100: #FEF9C3;  /* Light background */
  ```

### Secondary Colors
- Gray Scale
  ```css
  --gray-900: #111827;  /* Primary text */
  --gray-700: #374151;  /* Secondary text */
  --gray-500: #6B7280;  /* Disabled text */
  --gray-200: #E5E7EB;  /* Borders */
  --gray-100: #F3F4F6;  /* Background */
  --gray-50:  #F9FAFB;  /* Light Background */
  ```

### Semantic Colors
- Success/Error/Warning
  ```css
  --success-500: #22C55E;
  --error-500: #EF4444;
  --warning-500: #F59E0B;
  ```

## 📝 Typography

### Font Families
```css
--font-primary: 'Inter', sans-serif;  /* Main text */
--font-display: 'Inter', sans-serif;  /* Headings */
```

### Font Sizes
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## 🔲 Spacing System
```css
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
```

## 🎯 Border Radius
```css
--radius-sm: 0.125rem;  /* 2px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Full round */
```

## 💫 Animations
```css
--transition-base: 150ms ease-in-out;
--transition-slow: 300ms ease-in-out;
```

## 📱 Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
```

## 🧱 Component Base Styles

### Buttons
```css
.btn {
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  transition: var(--transition-base);
}

.btn-primary {
  background: var(--primary-yellow-500);
  color: white;
}

.btn-secondary {
  background: var(--gray-200);
  color: var(--gray-700);
}

.btn-outline {
  border: 2px solid var(--primary-yellow-500);
  color: var(--primary-yellow-500);
}
```

### Forms
```css
.input {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}

.input:focus {
  border-color: var(--primary-yellow-500);
  box-shadow: 0 0 0 2px var(--primary-yellow-100);
}
```

### Cards
```css
.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: var(--spacing-4);
}
```

## 🌈 Accessibility Guidelines

### Color Contrast
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Interactive elements must have visible focus states

### Text Sizes
- Minimum text size of 16px for body text
- Line height of 1.5 for optimal readability
- Maximum width of 65 characters per line

### Interactive Elements
- Minimum touch target size of 44x44px
- Clear hover and focus states
- Keyboard navigation support

## 📱 Responsive Design Principles

### Mobile First
- Design for mobile screens first
- Progressive enhancement for larger screens
- Maintain touch-friendly targets on all devices

### Grid System
- 12-column grid
- Consistent gutters (var(--spacing-4))
- Responsive breakpoints using CSS Grid

## 🔄 Implementation Next Steps

1. Create CSS variables file
2. Set up Tailwind config with these values
3. Create base component library
4. Document component usage
5. Create example pages using the system

---

*Note: This design system will evolve as we implement and test components. Regular updates will be made based on user feedback and accessibility testing.* 