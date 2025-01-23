<script lang="ts" setup>
const config = useRuntimeConfig();
const ApiKey = config.youtubeApiKey;
let urllists = ref<string[]>([]);
let channelid = ref<string>("");

interface ChannelData {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

interface PlaylistData {
  items: Array<{
    contentDetails: {
      videoId: string;
    };
  }>;
  nextPageToken?: string;
}

const getChannel = async () => {
  const data: any = await $fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelid.value}&key=${ApiKey}`
  );
  let playlistId = "";
  if (data) {
    data.items.forEach((item: any) => {
      playlistId = item.contentDetails.relatedPlaylists.uploads;
    });
  }
  await fetchPlaylistItems(playlistId);
};
const fetchPlaylistItems = async (
  playlistId: string,
  pageToken: string = ""
) => {
  const data2: PlaylistData = await $fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${pageToken}&key=${ApiKey}`
  );
  data2.items.forEach((item) => {
    urllists.value.push(item.contentDetails.videoId);
  });
  if (data2.nextPageToken) {
    await fetchPlaylistItems(playlistId, data2.nextPageToken);
  }
};
</script>
<template>
  <v-container>
    <div class="pb-4">
      <h1>Get URLs lists from Youtube</h1>
      <v-text-field
        label="chnnel id"
        v-model="channelid"
        style="width: 500px"
        class="primary"
      ></v-text-field>
      <v-btn @click="getChannel" variant="flat">submit</v-btn>
    </div>
    <div v-for="url in urllists" :key="url">
      <a :href="`https://www.youtube.com/watch?v=${url}`" target="_blank">
        {{ `https://www.youtube.com/watch?v=${url}` }}
      </a>
    </div>
  </v-container>
</template>
