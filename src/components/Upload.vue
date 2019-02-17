    <template>
  <div id="app">

    <file-pond
        name="file"
        ref="pond"
        label-idle='<sup>*</sup>Drag & Drop an image here or <span class="filepond--label-action"> Browse </span>'
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="myFiles"
        v-on:init="handleFilePondInit"/>
            <!-- @removefile="handleFileRemoved" -->
        <!-- server="http://localhost:8000/upload" -->
            <!-- @processfile="handleProcessSuccess"  -->




  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond, { setOptions }  from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
    name: 'app',
    data: function() {
        return {
             myFiles: [] ,
             cloudinary: {
            uploadPreset: 'n6mgm8sq',
            apiKey: 'Rx89lOR04EUUysYn2WF_LamWCgc',
            cloudName: 'micqual'
            },
             };
    },
     computed: {
    clUrl: function() {
        return `https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/upload`  
        },                
  },
    methods: {
        handleFilePondInit: function() {
            console.log('FilePond has initialized');
            setOptions({
    server: {
        process:(fieldName, file, metadata, load, error, progress, abort) => {

            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
             formData.append('upload_preset', this.cloudinary.uploadPreset);
             formData.append('tags', 'gs-vue,gs-vue-uploaded');

            console.log(formData);
            for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }

            // return true;

            const request = new XMLHttpRequest();
            request.open('POST', this.clUrl);

            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };

            // Should call the load method when done and pass the returned server file id
            // this server file id is then used later on when reverting or restoring a file
            // so your server knows which file to return without exposing that info to the client
            request.onload = function() {
                if (request.status >= 200 && request.status < 300) {
                    // the load method accepts either a string (id) or an object
                    load(request.responseText);
                }
                else {
                    // Can call the error method if something is wrong, should exit after
                    error('oh no');
                }
            };

            request.send(formData);
            
            // Should expose an abort method so the request can be cancelled
            return {
                abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();

                    // Let FilePond know the request has been cancelled
                    abort();
                }
            };
        }
    }
});

            // FilePond instance methods are available on `this.$refs.pond`
        },
         handleProcessSuccess(error, file) {
             console.log(file);
             
         }
    },
    components: {
        FilePond
    }
};
</script>