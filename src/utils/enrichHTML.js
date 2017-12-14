const enrichHTML = (html) => {
    const htmlWithLinks = html.replace(/((www\.|http:\/\/|https:\/\/)[^< ]+\.[^< ]+)/g, (match) => `<a href=${match} target="_blank">${match}</a>`);
    return htmlWithLinks;
};

export default enrichHTML;