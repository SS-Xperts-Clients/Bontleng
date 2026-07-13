# Pendula React Implementation Plan

## 1. Product Scope

Build a responsive React website for Pendula student accommodation, based on the supplied designs in `doc/design`.

Primary pages:

- Home
- Rooms
- Virtual Tour
- Contact and FAQ

Primary actions:

- Check Availability
- Request Viewing
- Enquire Now
- View Room Details
- Open room/space preview

The app will include a small Express backend for SMTP email handling. This keeps mail credentials server-side while allowing the frontend and API to be hosted as one Node app.

## 2. Source Designs

Desktop references:

- `doc/design/Home - Pendula (Desktop).png`
- `doc/design/Rooms - Pendula (Desktop).png`
- `doc/design/360° Tour - Pendula (Desktop).png`
- `doc/design/Contact & FAQ - Pendula (Desktop).png`

Mobile references:

- `doc/design/Home - Pendula.png`
- `doc/design/Rooms - Pendula.png`
- `doc/design/360° Tour - Pendula.png`
- `doc/design/Contact & FAQ - Pendula.png`

Brand asset:

- `pendula_logo.png`

## 3. Design Direction

The UI should keep the polished student-accommodation feel from the mockups:

- Deep forest green as the primary brand color.
- Warm gold/yellow for primary booking actions.
- Off-white/light grey page backgrounds.
- Large editorial serif headings.
- Clean sans-serif body text.
- Rounded cards, but restrained: use radius around 8px to 16px depending on element scale.
- Large real accommodation imagery as the main visual driver.
- Minimal decorative graphics.

Suggested fonts:

- Headings: `Playfair Display` or `Cormorant Garamond`.
- Body/UI: `Inter`.

If external font loading is avoided, use local fallbacks:

- Headings: `Georgia, serif`.
- Body/UI: `Inter, system-ui, sans-serif`.

## 4. Content Source of Truth

Use the user-supplied website detail as the source of truth for content. The supplied designs guide layout, visual style, and interaction patterns, but the live site copy must reflect the content below.

### About Us

Heading:

- We Care About Student Success

Copy:

- At Pendula Student Accommodation, we believe that every student deserves a comfortable place to call home.
- Our accommodation is designed to provide a peaceful, secure, and welcoming environment where students can study, grow, and build lifelong friendships.
- Our mission is to create more than just accommodation; we create a community.

### Rooms

Section heading:

- Comfortable Living Spaces

Section copy:

- Choose from accommodation options that suit your needs and budget.

Single Rooms:

- Private room for maximum comfort and privacy.
- Includes: bed, mattress, wardrobe, study desk, chair, Wi-Fi, electricity, water, stove, fridge, microwave.

Sharing Rooms:

- Affordable shared accommodation with ample space.
- Includes: bed, mattress, wardrobe, study desk, Wi-Fi, water and electricity, stove, fridge, microwave.

### Amenities

Keep these amenities unless the client later confirms otherwise:

- Unlimited Wi-Fi
- Fully equipped kitchen
- Laundry facilities
- Study areas
- Entertainment area
- Secure access
- CCTV surveillance
- Daily cleaning of common areas
- Secure parking
- Outdoor relaxation area

### Safety and Security

Section heading:

- Your safety is our priority.

Property features:

- CCTV cameras
- Controlled access
- Secure gates
- Perimeter fencing
- Emergency contact support
- House rules for peaceful living

### Explicit Omissions

Only remove or avoid amenities that are explicitly unavailable. Current omissions:

- Private gym
- Games room
- Coffee bar
- Bike storage

Do not remove general content unless it directly promises one of the unavailable facilities. For example, keep "Entertainment area" unless the client confirms it means a dedicated games room.

## 5. Page Breakdown

### Home

Sections:

- Header with logo, menu, nav links, and availability CTA.
- Hero with student accommodation imagery, headline, short value prop, and enquiry CTA.
- Trust/value chips: secure living, Wi-Fi, furnished rooms, student community.
- About section with accommodation image and short positioning copy.
- Benefits list: comfort, security, community.
- Amenities grid using the source-of-truth amenities list.
- Resident testimonial.
- Footer.
- Mobile bottom action bar with `Enquire` and `Request Viewing`.

### Rooms

Sections:

- Header.
- Page intro.
- Room cards/list.
- Each room includes image, type, price, feature chips, details CTA, tour CTA, enquiry CTA.
- Footer.
- Mobile bottom action bar.

Initial room types:

- Single Rooms
- Sharing Rooms

Use these room names consistently across the app unless the client supplies revised naming.

### Virtual Tour / Space Preview

Sections:

- Header.
- Full-width room preview hero area.
- Room/space selector.
- Tour control bar.
- Book a Viewing CTA.
- Experience highlights.
- Footer.

For phase 1, this is a polished interactive preview using normal photos or 3D-rendered images and selectable zones. Do not label flat images as a real 360 tour. A real 360 viewer can be added later if panoramic 2:1 assets are supplied.

### Contact and FAQ

Sections:

- Header.
- Page intro.
- FAQ accordion.
- Contact information.
- Enquiry form.
- Map/location block.
- Footer.
- Mobile bottom action bar.

Form fields:

- Full name
- Email address
- Phone number
- Academic institution
- Room type
- Intended move-in date
- Message
- Consent checkbox

## 6. Email Strategy

Use a small Express API for enquiry submissions.

- React posts enquiry data to `POST /api/enquiries`.
- Express validates the request.
- Express sends the email via SMTP using Nodemailer.
- SMTP credentials are stored only in server-side environment variables.
- In production, the same Express app serves the built React app from `dist/`.

Required environment variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO`

Optional environment variables:

- `PORT`
- `NODE_ENV`
- `CLIENT_ORIGIN`
- `SMTP_SECURE`
- `MAIL_FROM`

## 7. React Architecture

Recommended stack:

- Vite
- React
- React Router
- Express
- Nodemailer
- CSS Modules or plain CSS with design tokens
- Lucide React for icons

Suggested structure:

```text
server/
  index.js
src/
  assets/
  components/
    AppHeader.tsx
    AppFooter.tsx
    BottomActionBar.tsx
    Button.tsx
    AmenityCard.tsx
    RoomCard.tsx
    FaqAccordion.tsx
    EnquiryForm.tsx
  data/
    amenities.ts
    rooms.ts
    faqs.ts
    site.ts
  pages/
    HomePage.tsx
    RoomsPage.tsx
    TourPage.tsx
    ContactPage.tsx
  styles/
    tokens.css
    global.css
  main.tsx
```

Centralize content in `src/data` so room names, pricing, amenities, FAQ text, and contact details can be changed without digging through layout components.

## 8. Responsive Behavior

Desktop:

- Top navigation visible.
- Larger editorial headings.
- Two-column layouts for room details and contact sections.
- Footer with multiple columns.

Mobile:

- Compact header with menu icon and availability CTA.
- Single-column layouts.
- Bottom sticky action bar.
- Cards should use fixed image aspect ratios to prevent layout shift.
- Form fields must be full width.
- FAQ accordion touch targets should be at least 44px high.

## 9. Implementation Phases

### Phase 1: Scaffold and Tokens

- Create Vite React app.
- Create Express server.
- Add routing.
- Add global design tokens.
- Move logo and selected images into `src/assets`.
- Build shared header, footer, buttons, cards, and bottom action bar.

Acceptance:

- App runs locally.
- Header/footer work on all pages.
- Design colors and typography are established.

### Phase 2: Static Pages

- Build Home page.
- Build Rooms page.
- Build Virtual Tour static interaction.
- Build Contact and FAQ page.

Acceptance:

- Pages match the supplied desktop and mobile layouts closely.
- Removed amenities are not displayed.
- Navigation and CTAs route to the correct places.

### Phase 3: Forms and Email

- Add enquiry form validation.
- Add consent checkbox requirement.
- Integrate Express SMTP endpoint.
- Add success, loading, and error states.
- Protect against duplicate submissions.

Acceptance:

- Form cannot submit invalid data.
- Valid submissions send an email.
- User sees clear success or failure feedback.

### Phase 4: Polish and QA

- Test desktop and mobile breakpoints.
- Check text wrapping and button sizing.
- Optimize images.
- Add basic SEO metadata.
- Add favicon/app icons if assets are supplied.
- Run production build.

Acceptance:

- Production build passes.
- No obvious responsive overlap.
- Images load correctly.
- Contact form behavior is verified.

## 10. Open Decisions

- Confirm whether the project should use "Pendula" or "Pendule" everywhere. The designs use "Pendula"; the DOCX filename uses "Pendule".
- Confirm final room prices.
- Confirm final contact details and physical address.
- Confirm final SMTP provider and production SMTP values.
- Use static photos or 3D renders for phase 1. Add a real 360 viewer only if panoramic 2:1 assets are supplied.
- Confirm whether "Entertainment area" is acceptable as written or should be renamed to avoid confusion with "Games room".
