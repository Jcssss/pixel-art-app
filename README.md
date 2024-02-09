# Pixel Art App
A pixel art app featuring colour palette presets, layers, and editing tools. Designed using React JS and Typescript and implemented using an Electron framework.

# About

As a student thoroughly interested in Game Development, I've often enjoyed creating small games in my free time. One of my greatest struggles has always been creating artwork for the games. It was my hope that by creating this app, I could save myself time creating artwork, allowing me to spend more energy on other areas of development.

Here are some of the latest features I've added:
 - Resizable components, allowing users to effortlessly customize the sizes of toolbars and menus
 - A custom useCloseClick hook that closes elements when users click outside of them
 - A custom useHistory hook that tracks state history and allows users to undo/redo changes to their artwork

In the near future, I'd like to add the following features:
 - A layers pane, allowing users to draw on multiple canvases
 - A zoom in/zoom out feature that will allow users to optimize the size of their canvas
 - A selection tool, allowing users to select specific pixels and move them across the canvas

# Useful Articles and Tutorials
[Setting Up A React App With Electron](https://www.section.io/engineering-education/desktop-application-with-react/) - The tutorial I followed to get the original app setup

# Useful Packages and Libraries
[Electron IPC Channels](https://www.electronjs.org/docs/latest/tutorial/ipc) - Used to communicate between the app and the electron framework\
[React Color Picker Component](https://casesandberg.github.io/react-color/) - Used as the main color picker for the app, allowing users to pick the color of their brush
