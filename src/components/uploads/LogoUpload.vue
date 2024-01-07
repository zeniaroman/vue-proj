<template lang="pug">
.form__wrap
  .form__file-upload-preview
    img.form__file-upload-preview-img(:src="uploadData.previewImage")
  .form__file-upload-input
    span.form__file-upload-desc
    input.form__input.form__input-file(
      @change="uploadImage",
      type="file",
      accept="image/jpg, image/png"
    )
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  name: "LogoUpload",
  props: ["currentLogo"],
  emits: ["logoChanged"],
  setup(props, {emit}) {
    const uploadData = reactive({
      previewImage:
        props.currentLogo || "http://api.transferino.de/Uploads/thumb_99a21d9f-3225-429b-9beb-32899f15be52212955496.png",
      loaded: null,
    });

    async function uploadImageToApi() {
      const postBody = {
        base64String: uploadData.previewImage,
      };

      const result = await axios.post("Webapp/PostProfileImage", postBody);
      if(result.data.isSuccess) {
        emit('logoChanged', result.data.imageName)
      }
    }

    async function uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        uploadData.previewImage = e.target.result;
        uploadImageToApi();
      };
    }

    return {
      uploadData,
      uploadImage,
    };
  },
};
</script>

<style lang="sass" scoped>
.form
  &__wrap
    display: flex
    flex-direction: column
  &__file-upload
    &-preview-img
      width: 100px
      height: 100px
      background: c_input_bg()
      border-radius: 5px
</style>

