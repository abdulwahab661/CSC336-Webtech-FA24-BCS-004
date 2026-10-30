# Web Technologies Lab Midterm — README

## Student information

- **Name:** Abdul Wahab
- **Registration number:** FA24-BCS-004
- **Project:** Shophive electronics store (continued from Assignment 2)
- **AI tool used:** ChatGPT

## Personal numbers from the exam statement

| Item              | Calculation                     |                 Value |
| ----------------- | ------------------------------- | --------------------: |
| N                 | Last two digits of FA24-BCS-004 |                 **4** |
| BP                | 600 + N                         |             **604px** |
| H                 | (N x 7) mod 360                 |        **28 degrees** |
| K                 | (N mod 3) + 3                   |      **4 categories** |
| Accent colour     | hsl(H, 70%, 45%)                | **hsl(28, 70%, 45%)** |
| Sticky top        | (N mod 40) + 70                 |              **74px** |
| Premium threshold | N x 100                         |           **Rs. 400** |

## Project files

- **`index.html`** — Task 1 adds five category radio options (All plus four categories) and category classes to the eight existing product cards. Task 3 adds the live-search field, sort button, sort-status text, no-results message, price hooks and the `script.js` link.
- **`product.html`** — Task 2 changes the existing product content layout to CSS Grid named areas (`image`, `details`, `description`). The Shophive navbar, product content, quantity input, Add to Cart button and footer remain.
- **`style.css`** — Contains Task 1 CSS-only filtering and selected-state styling; Task 2 responsive named Grid areas and sticky details rule; Task 3 control and Premium badge styling; and a narrow-screen footer email wrapping rule.
- **`script.js`** — Task 3 plain JavaScript for case-insensitive live search, combined category/search filtering, the `No products found` state, alternating price sorting by moving existing cards with `appendChild()`, and Premium labels.
- **`README.md`** — This final project and task summary.
- **`FA24-BCS-004-midterm.pdf`** — Submission PDF. It contains student details, screenshots/evidence for all required viewport widths, Task 3 search and no-results states, and the changed/added code under task headings.

## Task 1 — CSS-only category filter

Added five radio options above the existing product grid: **All**, **Audio**, **Wearables**, **Power & Connectivity**, and **Computer Accessories**. All is selected by default. The eight existing cards were assigned to four suitable categories:

| Category             | Existing products                            |
| -------------------- | -------------------------------------------- |
| Audio                | Wireless Earbuds, Bluetooth Speaker          |
| Wearables            | Smart Watch                                  |
| Power & Connectivity | Power Bank 10000mAh, USB-C Hub               |
| Computer Accessories | Mechanical Keyboard, Gaming Mouse, HD Webcam |

The CSS `:checked` pseudo-class and general-sibling (`~`) selector identify the selected radio and hide non-matching `.product-item` wrappers with `display: none`. The selected label uses `hsl(28, 70%, 45%)`. No JavaScript is used for this task; the category filter was tested with JavaScript disabled.

## Task 2 — Product page layout with sticky details

Reworked the existing product section in `product.html` using CSS Grid named areas. Below **604px**, the areas stack in the order image, details, description. At **604px and wider**, image and details are side by side and description spans both columns. The details box uses `position: sticky` and `top: 74px` at and above the breakpoint. The description was lengthened so scrolling can demonstrate the sticky behaviour.

## Task 3 — JavaScript live search and price sort

Added a live search field and a Sort by price button above the existing grid. Search is case-insensitive and combines with the selected Task 1 category; a card must satisfy both conditions to remain visible. If no card matches, the exact message **No products found** is shown and the grid is hidden.

The sort button alternates Low to High and High to Low. Prices are read from each existing card, and the original card elements are moved with `appendChild()`; the grid is not rebuilt using `innerHTML` or a new product array/JSON. On page load, a Premium label is added to products costing **more than Rs. 400** (strictly greater than 400).

## Testing performed

The supplied browser test run checked these behaviours:

- **Task 1:** All is initially selected; Audio displays only Wireless Earbuds and Bluetooth Speaker; selected colour computes to `rgb(195, 109, 34)`, matching the requested HSL colour; filtering works with JavaScript disabled.
- **Task 2:** 375px uses the required one-column order and non-sticky details. At 604px and 1280px, the named areas form two columns and the description spans both; after scrolling, the details box is at 74px with `position: sticky`.
- **Task 3:** case-insensitive search, combined category and search, no-results message, both sort directions, and eight Premium labels were tested. No JavaScript page errors were recorded.
- **Responsive widths:** no horizontal overflow was detected at 375px, 604px or 1280px in the test environment.
