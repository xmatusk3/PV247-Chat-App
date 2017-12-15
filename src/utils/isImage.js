const isImage = (name) => {
    const lowerName = name.toLowerCase();
    return (lowerName.includes('.png') || lowerName.includes('.jpg') || lowerName.includes('.gif'));
};

export default isImage;