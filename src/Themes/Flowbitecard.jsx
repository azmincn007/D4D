// Theme.js
export const Flowbitecard = {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white  dark:border-gray-700 dark:bg-gray-800",
      children: "flex  flex-col justify-center gap-1 p-1",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:max-w-xl md:flex-row"
      },
      href: "hover:bg-gray-100 dark:hover:bg-gray-700"
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
      }
    }
  };
  export default Flowbitecard