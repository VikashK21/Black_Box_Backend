// import axios from "axios";
// import AuthContext, { dDomain as domain } from "../Context/AuthContext";
// import { useContext } from "react";


// // export const token = {
//   //   refreshToken: "nDVVtdztiSdUwy3twJeSGbfFg7wkE7erCp5d4RkcJx9lZ1cDXq8nrQ",
//   //   token:
//   //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzM5NjA2ODcsImlhdCI6MTY3Mzk1NzA4NywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiJmYzlhNjFjNi1jYmRjLTRiM2UtOGJhYi1iY2E1MGRhNjc4MmYiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJCbGFjayBCb3giLCJmaXJzdE5hbWUiOiJCbGFjayJ9.KZ1zLvO4GefMWQXdSr92Tmvf3QT4IIaocgr6DfrnOrlagWn4y3NJ6ajnJvxDEt4jRN5iFgEuHSzFfkKUXTSIkI-xLbi6YNml_moVtwJzbVpOhsE6GPVy_WYiQtYKgmafDLyTHjSYQnZ5Z4Ua6okbrRjTXjdEIRQev3uaQb2v4iMBfs3F7bD3J6PMpDlS91ruV1o0D-i2whjkHde02pa8c37DgJJBrVv70midSqESCPo9fpiAZ9xnr2WT0ZPOJraMs50fvriJkB4AXWW6COnIXTT_mw1NW40PFWoQLONrMVnAyFhIFjAO6NutmzUVgS3JLiH2uyy-zUhY6ZPty5V7EA",
// // };

// const reconcileJWT = async (token) => {
//   try {
//     const res = await axios.post(
//       domain + "auth/api/v1/reconcile-jwt",
//       { token },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       },
//     );
//     console.log(res.data);
//   } catch (err) {
//     console.log(err);
//   }
//   // .then((result) => {
//   //   console.log(result.data);
//   // })
//   // .catch((err) => {
//   //   console.log(err);
//   // });
// };

// reconcileJWT(
//   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaW1nX3RodW1ibmFpbCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTEtU2dsOHRwV29oVEoyOEtDSXlueFZtd0tXTEt1cFJ0NXdGd1ByPXM5Ni1jIiwiZmlyc3RfbmFtZSI6IkJsYWNrIiwibGFzdF9uYW1lIjoiQm94IiwiZW1haWwiOiJibGFja2JveGRpZ2l0YWwyMkBnbWFpbC5jb20iLCJwaG9uZV9udW0iOm51bGwsInBhc3N3b3JkIjoiJDJiJDEyJEQyb25RZDhkSXNnejVESGtzZG12OXV5Ri5HcTdlYlZjMHZ6U1V3YlQ2Sm05THg0Vm9XbThDIiwiYWJvdXQiOiJJIGFtIG9uZSBvZiB0aGUgRGV2ZWxvcGVyJ3MgcG9pbnRzIG9mIHZpZXcuLi4iLCJvdHAiOjAsInZlcmlmaWVkIjp0cnVlLCJhZG1pbiI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDIyLTEwLTI4VDA2OjM3OjAwLjE3NloiLCJjbGFzc3Jvb21faWQiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDIyLTExLTMwVDA2OjQ0OjQxLjM3N1oiLCJpYXQiOjE2NzM5NTcwMDEsImF1ZCI6Imh0dHBzOi8vd3d3LmJsYWNrYm94bm93LmNvbSIsImlzcyI6ImJsYWNrYm94bm93LmNvbSIsInN1YiI6ImJsYWNrYm94ZGlnaXRhbDIyQGdtYWlsLmNvbSJ9.Avxmwtk8XHb-6QhMlNK5-NjnxGr1J1kGPB-ERp3MePRnhSxUWqPY2Mhw-KSRX3RmAAi_oAkYEbNTye8YChO93f5EnBapVh_g1b2g5KNYUcamjXaTiImDSpVcAFiHBjAyZMUkfnO_vLycwW4e16u9rcetcouUZSCXr8ZeC1G7SpCsluAmS-CCn-mPtIWseIju6o1kh-uwOW6lRsQaTkvPpB-bV9Uihum4rkx18nb3g09MNg0N_YMsGuYS-PZt8orpp7NDUBA1r751-ZfdlhveniD0U31t9vQYeUlfO6e0RiQ9fqfFvcqlRylJTOiNTekNWuGWMwFJUIvZkw0l_1DZ4YreubynCdatLHhhvlcj-0Am3RaihVjZIku-X-BsFjnkS9WL3yPLmze_Pzx7Rvgys9gQlHU63BG-na-7f2pL91AaHk-OgjRZnEGb2vM3RHbljfVyfQs8UxV4J1C-PZaU3XXPujDgCvnM1jHsbrsLjLvQeCP3kE63HQYYULt__AaZAuCVTKZ0fjx4-0tVgscBUGh5a-0CH7dJbOwGWUh_fHypa3HMDF3-AXOjPepuqnlKJX702LcI_n40oefQQKboBXW_D-YXdtHdw-N6qo8tdkZppRkekeLGI6qTn33TSR7wX5sFx50VYAo2TPYGipaB8-3swHlQiG4KeltSewJwwhY",
// );

// const refreshJWT = async (refreshToken) => {
//   try {
//     const res = await axios.post(domain + "auth/api/v1/refresh-token", {
//       refreshToken,
//     });
//     console.log(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // refreshJWT("NnyO97ldpuAxfpNeWtROgxB4IOa-MDhFVNGMGaC2WC6MloRKggmhgw");

// /**
//  * refreshToken: 'zzgsFZ6f3essoEeeSMbPqLd7QlIket7e1phVjIk1J4rea7NZ3FCUlQ',
//   token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InkxekprX3hucTF0TlNSMmlTRDZEYW55cHFCOCJ9.eyJhdWQiOiJhMzUyNzkyMC1kYWNhLTRiNGYtOTc1Yi03OTgzNmYzYTUzNDUiLCJleHAiOjE2NzM5NTM5MDcsImlhdCI6MTY3Mzk1MDMwNywiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiI5OWQ4Zjg1ZS03ZTgwLTQ3ZWEtYWI4MC1lN2RmNzY3NzhlMTMiLCJqdGkiOiI3YTU4NzRiYy1mYTJmLTQ4ZjMtODU3NS1jNmJlMzhiZmYxYTQiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJGRURFUkFURURfSldUIiwiZW1haWwiOiJ2aWthc2hAYmFzay5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXBwbGljYXRpb25JZCI6ImEzNTI3OTIwLWRhY2EtNGI0Zi05NzViLTc5ODM2ZjNhNTM0NSIsInJvbGVzIjpbXSwiZnVsbE5hbWUiOiJWaWthc2ggS3VtYXIiLCJmaXJzdE5hbWUiOiJWaWthc2gifQ.T60JR666f7aAst2orEMRueSNluw9pfnBydRwd0qrjYM6eOFSZK10aD04lgg_ePgOo5LEo0ixP9oZCtSe-rzEZ0XSkGnRBzCuR4b0dvlOusfU0voBbReTk1p6OGw_RWO2p5IOZ7vUPzXhPLL-73n--ka5WkBeYMNIXO8xExcUmvYCasrVUx7SS2RAbhdIUKRaHftFTnlvhE2tPja7XXodrp_PdUb7B1ivMdJOfvFkDtBhsbRz8AbAVyz85aqWOKqScI_VsALP9QE4NXII9Hr8ENQSmaHtS2tgpzLnJ2HvWPu2dEs80blYEXB1RgdJtpXCZCHY49klUH0y_B3fqR_0Dw'
//  */


