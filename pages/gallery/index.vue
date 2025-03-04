<template>
<main class="v-gallery">
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <h1>Upload Photo</h1>

                <!-- Tabs for filtering images -->
                <v-tabs v-model="selectedTab">
                    <v-tab v-for="tab in tabs" :key="tab" :value="tab">{{ tab }}</v-tab>
                </v-tabs>

                <!-- Image Cards -->
                <v-row>
                    <v-col v-for="image in filteredImages" :key="image.src" cols="12">
                        <div class="d-flex uploaded-image-card mt-4">
                            <v-img :src="image.src" class="mb-2" height="90" width="90"></v-img>

                            <div class="d-flex justify-space-between flex-grow-1">
                                <div>
                                    <h2>{{ image.name }}</h2>
                                    <p>{{ image.type }}</p>
                                </div>

                                <div class="uploaded-image-card__actions">
                                    <v-icon @click="editImage(image)" icon="mdi-square-edit-outline"></v-icon>
                                    <v-icon @click="openDeleteModal(image)" icon="mdi-trash-can-outline"></v-icon>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>

                <!-- Edit Modal -->
                <v-dialog v-model="editDialog" max-width="400px">
                    <v-card class="pa-4" color="grey-darken-4">
                        <v-card-title>Edit Image</v-card-title>

                        <v-text-field v-model="editImageData.name" label="Name"></v-text-field>
                        <v-select v-model="editImageData.type" label="Category" :items="['Bedroom', 'Living room', 'Dining room', 'Office', 'Kitchen']"></v-select>

                        <v-card-actions>
                            <v-btn color="gray" @click="editDialog = false">Cancel</v-btn>
                            <v-btn color="deep-purple-accent-2" @click="saveEdit">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- Delete Confirmation Modal -->
                <v-dialog v-model="deleteDialog" max-width="400px">
                    <v-card class="pa-4" color="grey-darken-4">
                        <v-card-title>Delete Photo?</v-card-title>

                        <v-card-actions>
                            <v-btn color="gray" @click="deleteDialog = false">Cancel</v-btn>
                            <v-btn color="red" @click="confirmDelete">Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
</main>
</template>

<script>

export default {
    data() {
        return {
            selectedTab: "All",
            tabs: ["All", "Bedroom", "Living room", "Dining room", "Office", "Kitchen"],

            editDialog: false,
            editImageData: {
                name: "",
                type: "",
                src: ""
            },

            deleteDialog: false,
            deleteImageSrc: null,
        };
    },

    computed: {
        images() {
            return this.$store.state.images;
        },

        //Filtered images based on selected tab
        filteredImages() {
            if (this.selectedTab === "All") {
                return this.images;
            }
            return this.images.filter((img) => img.type === this.selectedTab);
        },
    },

    methods: {
        //Update image data
        updateImage(data) {
            this.$store.commit("updateImage", data);
        },

        //Delete image
        deleteImage(id) {
            this.$store.commit("deleteImage", id);
        },

        //Open edit modal
        editImage(image) {
            this.editImageData = {
                ...image
            };

            this.editDialog = true;
        },

        //Save edited image info
        saveEdit() {
            this.updateImage(this.editImageData);
            this.editDialog = false;
        },

        //Open delete confirmation modal
        openDeleteModal(image) {
            this.deleteDialog = true;
            this.deleteImageSrc = image.src;
        },

        //Confirm and delete image
        confirmDelete() {
            if (this.deleteImageSrc) {
                this.deleteImage(this.deleteImageSrc);
            }
            this.deleteDialog = false;
        },
    },
};
</script>

<style lang="scss">
@use '~/assets/scss/views/gallery.scss';
</style>
