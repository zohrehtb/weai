<template>
    <main class="v-home">
        <UploadImage @image-uploaded="onImageUploaded" v-if="!isUploaded" />
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import UploadImage from "@/components/UploadImage.vue";
  </script>
  