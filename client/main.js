var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    files: [],
  },
  filters: {
    kb(val) {
      return Math.floor(val / 1024);
    }
  },
  methods: {
    addFile(e) {
      let files = e.dataTransfer.files;
      [...files].forEach(file => {
        this.files.push(file);
        console.log(this.files)
      });
    },
    removeFile(file) {
      this.files = this.files.filter(f => {
        return f != file;
      });
    },
    compress() {
      let formdata = new FormData();
      formdata.append('file', this.files[0])
      
      axios.post('http://localhost:3000/compress', formdata, {responseType:'blob'}).then(response => {
        console.log(response.headers['content-disposition'])
        let fileURL = window.URL.createObjectURL(new Blob([(response.data)],{type: 'application/gzip'}))
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'gitl.gz');
        document.body.appendChild(fileLink);
        fileLink.click();
      })
    }
  }
})
