function getPaginate(data, pages, limit) {
  if (data) {
    return {
      data: data.rows,
      count: data.count,
      currentPage: parseInt(pages),
      totalPages: Math.ceil(data.count / limit),
    };
  } else {
    return { data: 0, count: 0, currentPage: parseInt(pages), totalPages: 0 };
  }
}

function textToSlug(text) {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

module.exports = {
  getPaginate,
  textToSlug,
};
