# Resume Builder Design Schematic (v3)

This document outlines the revised design and development plan for the resume builder application, focusing on a canvas-like, customizable user experience with rich media and resource support.

## 1. Core Philosophy

The application will function like a design tool (e.g., Canva) rather than a form-based editor. Users will have the freedom to drag, drop, and resize individual elements on a canvas, with a grid system to ensure alignment and a professional look.

## 2. Technology Stack

*   **Frontend Framework**: **React.js**
    *   **Why**: Its component-based architecture is ideal for managing individual resume "elements" as reusable components.

*   **State Management**: **Zustand**
    *   **Why**: A lightweight, modern, and simple state management solution that is a perfect fit for this project's scale.

*   **Layout/Grid System**: **`react-grid-layout`**
    *   **Why**: This is the key library for enabling the core canvas feature. It provides a draggable, resizable, and snapping grid system.

*   **Image Cropping**: **`react-image-crop`**
    *   **Why**: A feature-rich and user-friendly library for handling image uploads and cropping, essential for profile pictures.

*   **Authentication & Database**: **Firebase (Authentication & Firestore)**
    *   **Why**: A complete and easy-to-integrate backend solution for secure user accounts and data persistence.

*   **Styling**: **Styled-components** or **Emotion**
    *   **Why**: CSS-in-JS for component-scoped styles that work well with a dynamic, component-heavy application.

*   **PDF Generation**: **`html2pdf.js`**
    *   **Why**: Offers fine-grained control over the PDF output, which is crucial for a tool where visual fidelity is paramount.

*   **Icons**: **Bootstrap Icons** & **Feather Icons**
    *   **Why**: Both are high-quality, open-source icon sets that can be easily integrated and offered to users to enrich their resumes.

*   **Testing**: **Jest** & **React Testing Library**
    *   **Why**: The industry standard for testing React applications, ensuring reliability.

## 3. High-Level Architecture

*   **`CanvasComponent`**: The main component, powered by `react-grid-layout`, rendering all resume elements.
*   **`Element`**: A generic component that wraps different types of resume content (text, image, icon).
*   **`Toolbar`**: A UI panel to add new elements (e.g., "Add Text", "Add Image", "Add Icon").
*   **`PropertiesPanel`**: A context-aware panel that shows styling and content options for the selected element. For an image element, this would include an "Upload & Crop" button.
*   **`ResourceBrowser`**: A modal or sidebar for browsing and selecting icons and layout presets.
*   **Zustand Store**: Holds the `elements` and `layout` arrays. The `elements` array will now support new types like `image` and `icon`.

## 4. Data & User Flow

*   **Image Workflow**:
    1.  User adds an `image` element.
    2.  In the `PropertiesPanel`, they click "Upload Image".
    3.  A modal with `react-image-crop` opens.
    4.  User uploads, crops, and confirms.
    5.  The cropped image data is saved to the element's state in Zustand and persisted to Firestore.

*   **Resource Workflow**:
    1.  User opens the `ResourceBrowser`.
    2.  They can browse different layout presets or icon libraries.
    3.  Selecting a layout preset clears the canvas and loads the new layout and elements.
    4.  Selecting an icon adds it to the canvas as a new `icon` element.

## 5. User Stories

*   **As a user, I want to...**
    *   ...create an account and log in to save and access my work.
    *   ...add different types of elements (text, images, icons) to a blank canvas.
    *   ...upload a profile picture and crop it to fit perfectly.
    *   ...drag, drop, and resize any element on the canvas.
    *   ...have elements snap to a grid for easy alignment.
    *   ...edit the content and style (font, color, size) of each element individually.
    *   ...choose from a library of professional icons (e.g., for phone, email, LinkedIn).
    *   ...start with a pre-built template (Layout Preset) to save time.
    *   ...see my changes saved automatically.
    *   ...download a pixel-perfect PDF of my final resume design.
