<template>
 <div>
    <div>
      id:<el-input v-model="id"></el-input>
      <el-button @click="submit">提交</el-button>
    </div>
    <div>
      <el-input v-model="data"></el-input>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: '',
      data: 'default value!'
    }
  },
  methods: {
    submit () {
      this.$axios.post('api/Handler.ashx?id=' + this.id).then(res => {
        this.data = res.data
      })
    }
  }
}
</script>
