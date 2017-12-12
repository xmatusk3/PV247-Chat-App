const enrichHTML = (html) => {
    const a = html.replace(/((www\.|http:\/\/|https:\/\/)[^< ]+\.[^< ]+)/g, (match) => `<a href=${match} target="_blank">${match}</a>`);
    return a;
};

export default enrichHTML;