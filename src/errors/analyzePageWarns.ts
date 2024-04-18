export const analyzePageWarns = (content: string) => {
  if (content.includes("<head>")) {
    console.warn(
      "[multip] All <head> tags need to be placed in the layout file."
    );
  }
};
