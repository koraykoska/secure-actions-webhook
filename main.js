const request = require("request");
const crypto = require("crypto");

const hmacSecret = process.env.HMAC_SECRET;
if (!hmacSecret || hmacSecret === "" || hmacSecret.trim() === "") {
  console.warn(
    "The hmac secret seems empty. This doesn't seem like what you want."
  );
}
if (hmacSecret.length < 32) {
  console.warn(
    "The hmac secret seems week. You should use at least 32 secure random hex chars."
  );
}

const createHmacSignature = body => {
  const hmac = crypto.createHmac("sha1", hmacSecret);
  const bodySignature = hmac.update(JSON.stringify(body)).digest("hex");

  return `sha1=${bodySignature}`;
};

function isJsonString(str) {
  try {
    const json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
}

const uri = process.env.REQUEST_URI;
const data = {
  data: isJsonString(process.env.REQUEST_DATA)
    ? JSON.parse(process.env.REQUEST_DATA)
    : process.env.REQUEST_DATA
};

const signature = createHmacSignature(data);

request(
  {
    method: "POST",
    uri: uri,

    json: true,
    body: data,
    headers: {
      "X-Hub-Signature": signature
    }
  },
  (error, response, body) => {
    if (error || response.statusCode < 200 || response.statusCode > 299) {
      // Something went wrong
      console.error(`Request failed with status code ${response.statusCode}!`);
      console.error(response.body);

      process.exit(1);
    } else {
      // Success
      process.exit();
    }
  }
);
