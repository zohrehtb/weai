<template>
    <section>
      <div v-if="!imagePreview && !isLoading" class="pa-4 mb-4 c-uploaded-image d-flex h-100 justify-center align-center">
        <div 
          class="c-uploaded-image__area" 
          @click="triggerFileInput"
          @dragover.prevent 
          @dragenter.prevent 
          @drop="handleDrop"
        >
          <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none" />
    
            <p>Drag or Select Your Photo</p>

            <v-btn class="c-uploaded-image__btn">
              <v-icon icon="mdi-upload" class="mr-1"></v-icon>
              Upload
            </v-btn>
        </div>
      </div>

      <!-- Show loading -->
      <div v-if="isLoading" class="pa-4 mb-4 c-uploaded-image d-flex h-100 justify-center align-center">
        <div class="c-uploaded-image__area">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </div>

      <!-- Image Details Form -->
      <div v-if="imagePreview && !isLoading" class="d-flex justify-center align-center flex-column">
        <div class="image-show-title mt-4">
          <h1>Mask Items</h1>
          <p>Select a object or brush on object you want to redesign</p>
        </div>

        <div class="image-show">
          <v-img :src="imagePreview" class="mt-4 image-show__image"></v-img>
        
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="imageName" label="Name" append-inner-icon="mdi-square-edit-outline" variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-select v-model="imageType" label="Category" :items="['Bedroom', 'Living room', 'Dining room', 'Office', 'Kitchen']" variant="outlined"></v-select>
            </v-col>
          </v-row>
        </div>

       <div class="save-image d-flex w-100 justify-end">
        <v-btn color="primary" @click="saveImage" :disabled="!imageName || !imageType">Add</v-btn>
       </div>
      </div>
    </section>
</template>
  
  <script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  
  const fileInput = ref(null);
  const imageFile = ref(null);
  const imagePreview = ref(null);
  const imageName = ref("");
  const imageType = ref("");
  const isLoading = ref(false);
  
  //--- Trigger file input when user clicks the upload area
  const triggerFileInput = () => {
    fileInput.value.click();
  };
  
  //--- Add image with click
  const onFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };
  
  //--- Add image with drag & drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };
  
  //--- Process file (Shared by both input and drag/drop)
  const processFile = (file) => {
    if (file) {
      isLoading.value = true;
  
      setTimeout(() => {
        imageFile.value = file;
        imagePreview.value = URL.createObjectURL(file);
        isLoading.value = false;
      }, 2000);
    }
  };
  
  //--- Save image to Vuex & localStorage
  const saveImage = () => {
    if (!imageName.value || !imageType.value) {
      console.log("We should have your data :)");
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(imageFile.value);
  
    reader.onload = () => {
      store.commit("addImage", {
        name: imageName.value,
        type: imageType.value,
        src: reader.result,
      });
  
      // Reset for next upload
      imageFile.value = null;
      imagePreview.value = null;
      imageName.value = "";
      imageType.value = "";
    };
  };
  </script>
  
  <style lang="scss">

  .c-uploaded-image{
   &__area {
      width: 50%;
      height: 590px;
      border-radius: 10px;
      background: #4D4DBD66;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #CECEEE;
      font-size: 16px;
      margin-top: 10px;
      cursor: pointer;
      text-align: center;

      @media screen and (max-width:768px) {
        width: 95%;
      }
    }

    p{
      font-weight: bold;
      font-size: 20px;
      margin-bottom: 20px;
    }

    &__btn{
      background: #4D4DBD;
      color: #fff;
      font-weight: bold;
      border-radius: 30px;
      height: 50px !important;
      width: 135px;
      font-size: 16px;
      text-transform:none;

    }
  }

  .image-show-title{
    width:50%;

    @media screen and (max-width:768px) {
        width: 95%;
      }

    h1{
      color: #fff;
      font-size: 24px;
      font-weight: bold;
    }

    p{
      color: #A8A8BA;
      font-size: 12;
    }
  }

  .image-show{
      width:50%;

      @media screen and (max-width:768px) {
        width: 95%;
      }
      
      &__image{
        width: 100%;
        border-radius: 10px !important;
        margin-bottom: 20px;
      }
  }

  .v-field--variant-outlined{
    .v-field__outline__start,
    .v-field__outline__end{
      border-color: #fff !important;
    }
  }

  input.v-field__input,
  .v-select__selection-text{
    color: #fff !important;
  }

  .v-field--variant-outlined .v-field__outline__notch::before ,
  .v-field--variant-outlined .v-field__outline__notch::after {
    border-color: #fff;
  }

  .v-field.v-field--active .v-label.v-field-label--floating,
  .v-field--center-affix .v-label.v-field-label {
    color: #fff !important;
  } 

  .v-field__append-inner{
    color: #fff;
  }

  .save-image{
    width: 100%;
    background: #222225;
    padding: 20px 50px;

    .v-btn,
    .v-btn--disabled.v-btn--variant-elevated{
      width: 200px;
      height: 48px;
      background-color: #4D4DBD !important;
      color: #fff !important;
      border-radius: 30px;

      @media screen and (max-width:768px) {
        width: 100% !important;
      }
    }
  }
</style>
  