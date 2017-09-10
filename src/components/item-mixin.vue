<script>
  export default{
    props: {
      id: [ Number, String ],
      title: String,
      content: String,
      date: String,
      icon: String,
      css: String,
      tags: Array,
      editable:{ type: Boolean, default: false }
    }
  }
</script>
