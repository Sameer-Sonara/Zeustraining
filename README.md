# Zeustraining

Day 1: Web Development Basics
HTML (HyperText Markup Language)
HTML is the standard language used to create and design webpages.
It uses tags to define elements such as headings, paragraphs, images, links, tables, and forms.

Inline vs Block Elements
Inline Elements:
Take only as much width as needed.
Examples:  bold, italic

Block Elements:
Take the full available width.
Examples: headings, paragraphs

Ways to Implement CSS

Inline – CSS is added directly to HTML tags using the style attribute.
Internal – CSS is written inside <style> tags in the <head> section of the HTML file.
External – CSS is written in a separate .css file and linked using the <link> tag.

Preferred method: External CSS – It separates style from content, improves reusability, maintainability, and readability.


CSS Selectors
Element Selector – Selects all elements of a specific type.
Example: p { color: red; }

Class Selector – Selects all elements with a given class.
Example: .box { padding: 10px; }

ID Selector – Selects a single unique element.
Example: #header { background: black; }

Ways to Add JavaScript

Inline – JS is added directly within HTML tags using events like onclick.
Internal – JS code is written inside <script> tags in the HTML file.
External – JS code is written in a separate .js file and linked using <script src="script.js"></script>.

Preferred method: External JS – It keeps code modular, reusable, cleaner, and more readable.


Day 2:

Tips for keep CSS organized
- always use SASS
- write your HTML before CSS
- organize your component using BEM
- Don't reference IDs in CSS
- use GitHub CS guidelines
- avoid using <i>!important</i>
- use bootstrap only when needed
- keep HTML simple and readable


Tips for web fonts
- always use veriable fonts
- preload your fonts for speed 
- self host fonts for fast , privacy and control

Day 3:
Frontend: Polishing UI Components
 
Focused on replicating every small detail of the given design template.
Paid close attention to:
Padding, spacing, and alignment
Font sizing and weight
Rounded corners and shadows
Used proper <div> containers to structure the layout logically and ensure responsiveness.

Goal: Make the component look and feel identical to the original, pixel by pixel.


Main Task:Calculating Large Factorials (like 1000!)
Problem:
JavaScript cannot handle extremely large numbers like 1000! using standard Number or BigInt alone for educational simulations.

Solution: Use an Array to Store Each Digit
To compute large factorials:
We store the number as an array of digits in reverse order.
Example: 1234 is stored as [1,2,3,4].

This allows:
Digit-by-digit multiplication
Manual carry-over (like doing multiplication on paper)

Optimization: Store More Than One Digit Per Array Element
Instead of one digit per slot, store blocks of digits
Example:
12345678 is  stored as [12,34,56,78].
Use base 10^9 (i.e., 1 billion) for each array element.

Benefits:
Reduces array size
Speeds up multiplication

Day 4:

Learned about CSS Grid and Flexbox, and how they work.
Used this knowledge to create a basic grid container with various styled boxes.
Also learned about Bootstrap – an open-source CSS framework that provides pre-made components for building responsive and modern web interfaces easily.



colors in selcted excel
rgba(229,240,248,255)
rgba(242,237,247,255)
rgba(231,240,231,255)
rgba(248,234,234,255)
rgba(248,229,241,255)