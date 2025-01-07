export const validURLConvert = (name) => {
    if (!name) return '';
    const url = name.toString().replace(/[,#?\s&]/g, '-');
    return url;
};
