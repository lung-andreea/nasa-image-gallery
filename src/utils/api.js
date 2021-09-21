import $ from "jquery";

const API_KEY = "4OeEnAEfBaQ39ZacuIi5dpTTbL9OIRsDYJFAzkm9";
const API_GATEWAY_URL = `https://images-assets.nasa.gov`;

const api = {
  ENDPOINT: {
    POPULAR: `${API_GATEWAY_URL}/popular.json?api_key=${API_KEY}`,
  },

  getMostPopular: () => {
    return $.ajax(api.ENDPOINT.POPULAR, {
      type: "GET",
      contentType: "application/json; charset=UTF-8",
    });
  },
};

export default api;
