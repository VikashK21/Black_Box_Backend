import axios from "axios";
const domain = "https://test-blackis.dolphinvc.com/";
const token = {
  refreshToken: "nDVVtdztiSdUwy3twJeSGbfFg7wkE7erCp5d4RkcJx9lZ1cDXq8nrQ",
  token:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzM5NjA2ODcsImlhdCI6MTY3Mzk1NzA4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiJmYzlhNjFjNi1jYmRjLTRiM2UtOGJhYi1iY2E1MGRhNjc4MmYiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJCbGFjayBCb3giLCJmaXJzdE5hbWUiOiJCbGFjayJ9.KZ1zLvO4GefMWQXdSr92Tmvf3QT4IIaocgr6DfrnOrlagWn4y3NJ6ajnJvxDEt4jRN5iFgEuHSzFfkKUXTSIkI-xLbi6YNml_moVtwJzbVpOhsE6GPVy_WYiQtYKgmafDLyTHjSYQnZ5Z4Ua6okbrRjTXjdEIRQev3uaQb2v4iMBfs3F7bD3J6PMpDlS91ruV1o0D-i2whjkHde02pa8c37DgJJBrVv70midSqESCPo9fpiAZ9xnr2WT0ZPOJraMs50fvriJkB4AXWW6COnIXTT_mw1NW40PFWoQLONrMVnAyFhIFjAO6NutmzUVgS3JLiH2uyy-zUhY6ZPty5V7EA",
};

const createTenant = async (data) => {
  try {
    const res = await axios.post(
      domain + "account/api/v1/tenants/api-key",
      data,
      {
        headers: {
          Authorization: token.token,
        },
      },
    );
    console.log(res.data, "this response");
  } catch (err) {
    console.log(err, "this error");
  }
};

createTenant({
  name: "Black Box Server",
  api_key_permissions: ["meeting", "recording"],
});

const getTenant = async () => {
  try {
    const res = await axios.get(domain + "account/api/v1/tenants/api-key/all", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    });
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};
// getTenant();
