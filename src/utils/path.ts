export const fixPath = (path: string, root: string) => {
    const pathArray = path.split(root);
    const correctPath = pathArray.slice(1).join("");

    return "./" + root + correctPath;
}