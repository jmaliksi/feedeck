import NodeCache from "node-cache";
import { setTeamOptions, setPlayerOptions } from "../redux/actions";
import emoji from "../lib/emoji";

const cache = new NodeCache();

export const getNames = () => {
  var p = cache.get("names");
  if (p !== undefined) {
    return Promise.resolve(p);
  }
  return fetch(`https://api.sibr.dev/chronicler/v1/players/names`)
    .then(res => res.json())
    .then(res => {
      cache.set("names", res, 600);
      return res;
    })
}

export const getName = async function(uuid) {
  var p = await getNames();
  return p[uuid];
};

export const initChron = () => {
  getNames()
    .then(res => {
      setPlayerOptions(
        Object.entries(res).map((n) => ({value: n[0], label: n[1]}))
      );
    });

  fetch(`https://api.sibr.dev/chronicler/v1/teams`)
    .then(res => res.json())
    .then(res => {

      let data = res.data
        .sort((a, b) => {
          a = a.data.state?.scattered?.fullName || a.data.fullName;
          b = b.data.state?.scattered?.fullName || b.data.fullName;
          return a < b ? -1 : a > b ? 1 : 0;
        })
        .map((d) => ({
          value: d.id,
          label: `${emoji(d.data.emoji)} ${d.data.state?.scattered?.fullName || d.data.fullName}`,
        }));

      let options = [
        { label: "ILB", options: data.filter((d) => ilbTeamIds.indexOf(d.value) !== -1) },
        { label: "Library", options: data.filter((d) => libraryTeamIds.indexOf(d.value) !== -1) },
        { label: "Gamma8 (Short Circuit)", options: data.filter((d) => gamma8TeamIds.indexOf(d.value) !== -1) },
        { label: "Gamma9 (Short Circuit)", options: data.filter((d) => gamma9TeamIds.indexOf(d.value) !== -1) },
        //{ label: "Coffee Cup", options: data.filter((d) => coffeeTeamIds.indexOf(d.value) !== -1) },
        //{ label: "Special", options: data.filter((d) => specialTeamIds.indexOf(d.value) !== -1) },
        //{ label: "Gamma7", options: data.filter((d) => gamma7TeamIds.indexOf(d.value) !== -1) },
        //{ label: "Gamma5", options: data.filter((d) => gamma5TeamIds.indexOf(d.value) !== -1) },
        //{ label: "Gamma4", options: data.filter((d) => gamma4TeamIds.indexOf(d.value) !== -1) },
      ];

      setTeamOptions(options);
    });
};

// stolen from https://github.com/xSke/blaseball-player-list/blob/main/src/teams.ts thanks astrid
const ilbTeamIds = [
  "105bc3ff-1320-4e37-8ef0-8d595cb95dd0",
  "23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7",
  "36569151-a2fb-43c1-9df7-2df512424c82",
  "3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e",
  "46358869-dce9-4a01-bfba-ac24fc56f57e",
  "57ec08cc-0411-4643-b304-0e80dbc15ac7",
  "747b8e4a-7e50-4638-a973-ea7950a3e739",
  "7966eb04-efcc-499b-8f03-d13916330531",
  "878c1bf6-0d21-4659-bfee-916c8314d69c",
  "8d87c468-699a-47a8-b40d-cfb73a5660ad",
  "979aee4a-6d80-4863-bf1c-ee1a78e06024",
  "9debc64f-74b7-4ae1-a4d6-fce0144b6ea5",
  "a37f9158-7f82-46bc-908c-c9e2dda7c33b",
  "adc5b394-8f76-416d-9ce9-813706877b84",
  "b024e975-1c4a-4575-8936-a3754a08806a",
  "b63be8c2-576a-4d6e-8daf-814f8bcea96f",
  "b72f3061-f573-40d7-832a-5ad475bd7909",
  "bb4a9de5-c924-4923-a0cb-9d1445f1ee5d",
  "bfd38797-8404-4b38-8b82-341da28b1f83",
  "c73b705c-40ad-4633-a6ed-d357ee2e2bcf",
  "ca3f1c8c-c025-4d8e-8eef-5be6accbeb16",
  "d9f89a8a-c563-493e-9d64-78e4f9a55d4a",
  "eb67ae5e-c4bf-46ca-bbbc-425cd34182ff",
  "f02aeae2-5e6a-4098-9842-02d2273f25c7",
];

const libraryTeamIds = [
  "88151292-6c12-4fb8-b2d6-3e64821293b3", // Alaskan Immortals
  "54d0d0f2-16e0-42a0-9fff-79cfa7c4a157", // Antarctic Fireballs
  "9494152b-99f6-4adb-9573-f9e084bc813f", // Baltimore Crabs (alt)
  "cfd20759-5f9c-4596-9493-2669b6daf396", // Beijing Bicycles
  "939db13f-79c9-41c5-9a15-b340b1bea875", // Boulders Bay Birds
  "67c0a873-ef6d-4a85-8293-af638edf3c9f", // Busan Bison
  "d6a352fc-b675-40a0-864d-f4fd50aaeea0", // Canada Artists
  "ed60c164-fd31-42ff-8ae1-70220626f5a7", // Canberra Drop Bears
  "2e22beba-8e36-42ba-a8bf-975683c52b5f", // Carolina Queens
  "55c9fee3-79c8-4467-8dfb-ff1e340aae8c", // Dallas Cows
  "71c621eb-85dc-4bd7-a690-0c68c0e6fb90", // Downward Dogs
  "74966fbd-5d77-48b1-8075-9bf197583775", // Florence Rhinoceroses
  "4c192065-65d8-4010-8145-395f82d24ddf", // Green Hill Hedgehogs
  "b6b5df8f-5602-4883-b47d-07e77ed9d5af", // Laredo Excavators
  "00245773-6f25-43b1-a863-42b4068888f0", // La Paz Llamas
  "26f947db-4e2a-41a5-896c-02cf8eb47af0", // Lisbon Lynx
  "7bc12507-1a84-4921-9338-c1888d56dcd7", // London Frogs
  "1e04e5cc-80a6-41c0-af0d-7292817eed79", // Louisville Lobsters
  "d0762a7e-004b-48a9-a832-a993982b305b", // Mallorca Whales
  "3a094991-4cbc-4786-b74c-688876d243f4", // Maryland Squirrels
  "c19bb50b-9a22-4dd2-8200-bce639b1b239", // Minneapolis Truckers
  "53d473fb-ffee-4fd3-aa1c-671228adc592", // New Hampshire Eggplants
  "cbd44c06-231a-4d1a-bb7d-4170b06e566a", // Oklahoma Heartthrobs
  "1a51664e-efec-45fa-b0ba-06d04c344628", // Oregon Psychics
  "8e50d878-3dcd-4c27-9f1c-8d8f20f17077", // Portland Otters
  "258f6389-aac1-43d2-b30a-4b4dde90d5eb", // Kola Boar
  "a4b23784-0132-4813-b300-f7449cb06493", // Phoenix Trunks
  "774762ee-c234-4c57-90a1-e1e69db3f6a7", // Sao Paulo Parrots
  "4cd14d96-f817-41a3-af6c-2d3ed0dd20b7", // San Diego Saltines
  "3543229a-668c-4ac9-b64a-588422481f12", // Wyoming Dolphins
];

const specialTeamIds = [
  "698cfc6d-e95e-4391-b754-b87337e4d2a9", // Vault Legends
  "280c587b-e8f6-4a7e-a8ce-fd2fa2fa3e70", // Rising Stars
  "d2634113-b650-47b9-ad95-673f8e28e687", // Data Witches
  "3b0a289b-aebd-493c-bc11-96793e7216d5", // Artists
  "7fcb63bc-11f2-40b9-b465-f1d458692a63", // Game Band
  "c6c01051-cdd4-47d6-8a98-bb5b754f937f", // Hall Stars
  "40b9ec2a-cb43-4dbb-b836-5accb62e7c20", // PODS
];

export const coffeeTeamIds = [
  "49181b72-7f1c-4f1c-929f-928d763ad7fb",
  "4d921519-410b-41e2-882e-9726a4e54a6a",
  "4e5d0063-73b4-440a-b2d1-214a7345cf16",
  "70eab4ab-6cb1-41e7-ac8b-1050ee12eecc",
  "9a5ab308-41f2-4889-a3c3-733b9aab806e",
  "9e42c12a-7561-42a2-b2d0-7cf81a817a5e",
  "a3ea6358-ce03-4f23-85f9-deb38cb81b20",
  "a7592bd7-1d3c-4ffb-8b3a-0b1e4bc321fd",
  "b3b9636a-f88a-47dc-a91d-86ecc79f9934",
  "d8f82163-2e74-496b-8e4b-2ab35b2d3ff1",
  "e3f90fa1-0bbe-40df-88ce-578d0723a23b",
  "e8f7ffee-ec53-4fe0-8e87-ea8ff1d0b4a9",
  "f29d6e60-8fce-4ac6-8bc2-b5e3cabc5696",
];

export const gamma8TeamIds = [
  "b320131f-da0d-43e1-9b98-f936a0ee417a",
  "16d1fd9b-c62b-4bed-b68a-b3a2d6e21524",
  "e11df0cc-3a95-4159-9a84-fecbbf23ae05",
  "23a2cea4-5df7-4ed0-bb2c-b8c297518ada",
  "44d9dc46-7e81-4e21-acff-c0f5dd399ae3",
  "0b672007-ebfb-476d-8fdb-fb66bad78df2",
  "74aea6b6-34f9-48f4-b298-7345e1f9f7cb",
  "2dc7a1fa-3ae6-47ed-8c92-5d80167959f5",
  "b069fdc6-2204-423a-932c-09037adcd845",
  "6526d5df-6a9c-48e1-ba50-12dec0d8b22f",
  "89796ffb-843a-4163-8dec-1bef229c68cb",
  "2957236a-6077-4012-a445-8c5be111afd0",
  "8981c839-cbcf-47e3-a74e-8731dcff24fe",
  "b7df2ea6-f4e8-4e6b-8c98-f730701f3717",
  "8d7ba290-5f87-403c-81e3-cf5a2b6a6082",
  "76d3489f-c7c4-4cb9-9c58-b1e1bab062d1",
  "a01f0ade-0186-464d-8c68-e19a29cb66f0",
  "b35926d4-22a3-4419-8fab-686c41687055",
  "d82a1a80-dff3-4767-bab6-484b2eb7aee1",
  "86f4485a-a6db-470b-82f5-e95e6b353537",
  "93e71a0e-80fc-46b7-beaf-d204c425fe03",
  "effdbd8d-a54f-4049-a3c8-b5f944e5278b",
  "75667373-b350-499b-b86e-5518b6f9f6ab",
  "57d3f614-f8d3-4dfd-b486-075f823fdb0b",
];

export const gamma7TeamIds = [
  "4cf31f0e-fb42-4933-8fdb-fde58d109ced",
  "3aba36e6-9dd7-417f-9d3a-69d778439020",
  "7ce9e0b0-9639-45f1-8db6-32c30ca0012d",
  "b5b4fb6b-08d8-401a-85d5-f08afa84af63",
  "f8d99dc7-ae37-4f35-b08c-543864a347f2",
  "2ec5927e-9905-408c-a04c-65a8879f846a",
  "11b92425-aa46-4691-b42f-baa2b6ddb541",
  "99edf2f4-f47d-46ee-998a-4cb4200236f7",
  "f3490435-a42f-42a8-ab89-d59e8dc8d599",
  "b7f9cc0c-6a6c-4bed-adbb-2d2d2dfbe810",
  "c0dc2c80-463e-49f7-9e00-c62473d677c8",
  "d2c33336-b5a9-4ce1-86bb-f376ec66efbd",
  "3b1c5a25-ed79-4ce2-87d4-0c1cf3ff342e",
  "628bb28b-306e-4ff7-ad02-05524bcf246a",
  "ae0661b9-af66-4d4b-acc7-041e5cccb4bb",
  "cc9de838-4431-4cc7-9c3e-15b15b2142b0",
  "910974d7-cbfd-4d2d-8733-7e85759932da",
  "8aaf714b-d42a-40b0-9165-384befc66d55",
  "0eae657b-3592-43fb-93e1-b878680d2b53",
  "8756d8e1-bd9d-4116-8fd0-5ea06c2e80c3",
];

export const gamma5TeamIds = [
  "2d07beca-bdb1-4ecb-bcfe-5913e2b406f5",
  "444f2846-8927-4271-b2ca-6bf8b5b94610",
  "cd29d13d-99d4-414b-8faa-f0819b2de526",
  "ca117809-cda1-4ae0-b607-53079fb5b133",
  "09a77dd0-13c6-4c18-870a-63cd005ddff6",
  "16be150e-372e-453e-b6ff-597aa42ca5ee",
  "4d5f27b5-8924-498f-aa4c-7f5967c0c7c6",
  "635c332d-6ea9-4766-b391-ae4c3435f677",
  "ea3c8019-b6b6-4830-b952-7e9c2ce707bd",
  "e4f7549c-17af-4e35-b89b-f0fae855a31b",
  "71b157bc-8a50-4c05-a785-034f660e493f",
  "074b5e4a-84f8-428d-884e-4592a77ee061",
  "0a449b4d-504b-448c-9516-6027fd6d216e",
  "4b1004bc-345e-4084-8d18-b46315624864",
  "365b4517-4b0a-45da-aaa6-161dd77de99a",
  "fca16c92-5f03-45b9-abbe-760866878ffe",
  "9685b9a9-8765-49e1-88ca-c153ad0276d0",
  "6e655fc7-5190-4e55-99a0-89683d443cfc",
  "2d02b60b-d858-4b8a-a835-c1e8fe1b8fe0",
  "c794d5aa-6104-420e-ae6f-3b2c270253fd",
];

export const gamma4TeamIds = [
  "ba6d5599-1242-41ed-be64-90de7b1c255f",
  "378e3344-1a1a-4332-80cc-3da45954a4f4",
  "bebf13f9-82d1-4133-9b14-4a96de029ccf",
  "a554e084-b483-42da-89fb-39cd49ad7df6",
  "3cea1405-3a5f-432c-96c3-a85dc7f163ee",
  "70167f08-5e85-44d7-b047-2961201c1615",
  "110a62be-bc8a-4f0c-8046-0eb580b1af1c",
  "cade1731-39a8-43f3-be8e-d2302711fe8b",
  "f9045b82-5570-43d4-856b-bed5095515c6",
  "780054a7-74ee-44fd-ab5f-6dd4637c5ef1",
  "34a2e6ca-08fd-468e-894b-c707d6ce460a",
  "a922603d-30c6-48d1-a83b-ae9be96675b6",
  "e12313fe-c0c9-49de-9d11-8b7408aa92ce",
  "5663778c-c8fb-4408-908a-31dc1f6c55cc",
  "86435ed2-d205-4c37-be22-89683b9a7a62",
  "2de5c38c-3d72-4d97-af0f-15e98eba2225",
  "5d3bd8ab-cc9a-4aa5-bbcd-fa0f96566c64",
  "d2874e7f-8e88-442a-a176-e256df68a49b",
  "9657f04e-1c51-4951-88de-d376bb57f5bd",
  "5666fce7-3b39-4ade-9220-71244d9be5d8",
];

export const gamma9TeamIds = [
  '3a4412d6-5404-4801-bf06-81cb7884fae4',
  'd2949bd0-6a28-4e0d-aa07-cecc437cbd99',
  '045b4b38-fb11-4fa6-8dc0-f75997eacd28',
  '79347640-8d5d-4e41-819d-2b0c86f20b76',
  '30c9bcd2-cc5a-421d-97d0-d39fefad053a',
  '505ae98b-7d85-4f51-99ef-60ccd7365d97',
  '5371833b-a620-4952-b2cb-a15eed8ad183',
  '6f9ff34d-825f-477b-8600-1cec4febaecf',
  'a94de6ef-5fc9-4470-89a0-557072fe4daf',
  '36f4efea-9d27-4457-a7b4-4b45ad2e23a3',
  '7dc37924-0bb8-4e40-a826-c497d51e447c',
  '93f91157-f628-4c9a-a392-d2b1dbd79ac5',
  '9a2f6bb9-c72c-437c-a3c4-e076dc5d10d4',
  '9da5c6b8-ccad-4bb5-b6b8-dc1d6b8ca6ed',
  'f0ec8435-0427-4ffd-ad0c-a67f60a75e0e',
  '22d8a1e9-e679-4bde-ae8a-318cb591d1c8',
  '3d858bda-dcef-4d05-928e-6557d3123f17',
  '5818fb9b-f191-462e-9085-6fe311aaaf70',
  '8b38afb3-2e20-4e73-bb00-22bab14e3cda',
  'fab9420f-0730-4054-bd17-355113f204c2',
  '0706f3cf-d6c4-4bd0-ac8c-de3d75ffa77e',
  '19f81c84-9a94-49fa-9c23-2e1355126250',
  'b1a50aa9-c515-46e8-8db9-d5378840362c',
  'ee722cbd-812f-4525-81d7-dfa89fb867a4',
];
