<template>
  <div class="container1">
    <div class="panel active" style="background-image: url('../../assets/img/1.jpg') ;">
      <h3>The 1 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/2.jpg') ;">
      <h3>The 2 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/3.png') ;">
      <h3>The 3 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/4.png') ;">
      <h3>The 4 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/5.jpg') ;">
      <h3>The 5 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/2.jpg') ;">
      <h3>The 2 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/3.png') ;">
      <h3>The 3 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/4.png') ;">
      <h3>The 4 picture</h3>
    </div>
    <div class="panel" style="background-image: url('../../assets/img/5.jpg') ;">
      <h3>The 5 picture</h3>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted(){
    console.log('jjj');
    this.active()
  },
  methods: {
    active(){
      const panels = document.querySelectorAll('.panel')

      panels.forEach(panel => {
        panel.addEventListener('click',() => {
          this.removeActiveClasses()
          panel.classList.add('active')
        })
      })
    },
      removeActiveClasses() {
        panels.forEach(panel => {
          panel.classList.remove('active')
        })
      }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

*{
  /* padding和border的值就不会在影响元素的宽高，相当于把padding和border的值都算在content里 */
  box-sizing: border-box; 
}
body{
  font-family: 'Muli' sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}

.container1{
  display: flex;
  width: 90vw;
}

.panel{
  background-size: cover; /* 图片按比例撑开元素，超出的部分会被裁掉 */
  background-position: center;
  background-repeat: no-repeat;
  height: 80vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer; /* 鼠标在图片上是显示的形状(伸食指的手) */
  flex: 0.5;
  margin: 10px;
  position: relative; /* 用于子元素absolute定位*/
  -webkit-transition: all 700ms ease-in; /*过渡*/
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0; /* 未选中时字体为透明的 */
}

.panel.active{
  flex: 5; /* 放大比例与其他未选中的不一样了 */
}

.panel.active h3{
  opacity: 1; /* 不透明 */
  transition: opacity 0.3 ease-in 0.4s; /* 过渡 */
}

@media(max-width:480px){
  .container1{
    width: 100vh;
  }

  .panel:nth-of-type(4),
  .panel:nth-of-type(5){
    display: none;
  }
}
</style>
