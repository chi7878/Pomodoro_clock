var app = new Vue({
    el: "#app",
    data: {
        message: "Hello Vue!",
        addmission: {
            name: "",
            finish: false,
        },
        mission_list: [
            {
                name: "the First thing to do today",
                finish: false,
            },
            {
                name: "the second thing to do today",
                finish: false,
            },
            {
                name: "the third thing to do today",
                finish: false,
            },
            {
                name: "the Forth thing to do today",
                finish: false,
            },
            {
                name: "complete the keynote",
                finish: false,
            },
            {
                name: "prepare presentation",
                finish: false,
            },

        ],
        finish_mission:[
            {
                name: "mockup of the new case",
                finish: true,
            },
            {
                name: "product prototype",
                finish: true,
            },
            {
                name: "draw a wireframe",
                finish: true,
            },
            {
                name: "website detail refine",
                finish: true,
            },
        ],
        time:{
            all_time:1500,
            minute:"25",
            second:"00",
        },
        radius_deg:{
            left:180,
            right:180,
        },
        play_start:false,
        play_rest:false,
        setnum:null,
        menu:"",
        menu_status:"hidden",
    },
    methods: {
        add_click: function() {
            this.mission_list.push(this.addmission);
            this.addmission={
                name: "",
                finish: false,
            };
        },
        settime:function(){
            let vm=this;
            this.setnum=setInterval(function(){
                vm.time.all_time -=1;

                if(vm.time.all_time%4 == 0){
                    if(vm.radius_deg.right <360){
                        vm.radius_deg.right +=1;
                    }else{
                        vm.radius_deg.left +=1;
                    }
                }

                if(vm.time.all_time/60>=0&&vm.time.all_time/60<=9){
                    vm.time.minute = "0"+(Math.floor(vm.time.all_time/60));
                }else{
                    vm.time.minute=Math.floor(vm.time.all_time/60);
                }

                if(vm.time.all_time%60>=0&&vm.time.all_time%60<=9){
                    vm.time.second = "0"+(vm.time.all_time%60);
                }else{
                    vm.time.second=vm.time.all_time%60;
                }

                if(vm.time.all_time == 0){
                    clearInterval(vm.setnum);

                    if(vm.play_rest==true){
                        vm.play_rest=false;
                    }else{
                        vm.play_rest=true;
                    }
                    if(vm.play_rest == true){
                        vm.time={
                            all_time:5,
                            minute:"00",
                            second:"05",
                        };
                    }else{
                        vm.time={
                            all_time:1500,
                            minute:"25",
                            second:"00",
                        };
                        vm.mission_list.shift();
                    }
                    vm.radius_deg={
                        left:180,
                        right:180,
                    };
                    vm.finish_mission.unshift(vm.mission_list[0]);
                    vm.play_start=false;
                    
                    
                }
            }, 1000);
        },
        mission_start:function(){
            let vm =this;
            if(vm.play_start==true){
                clearInterval(vm.setnum);
                vm.play_start=false;
            }else{
                vm.settime();
                vm.play_start=true;
            }
        },
        agin_mission(){
            if(this.play_rest == true){
                this.time={
                    all_time:300,
                    minute:"05",
                    second:"00",
                };
            }else{
                this.time={
                    all_time:1500,
                    minute:"25",
                    second:"00",
                };
            }
            this.radius_deg={
                left:180,
                right:180,
            }
            clearInterval(this.setnum);
            this.play_start=false;
        },
        change_mission(item){
            let mission_num = this.mission_list.indexOf(item);
            let first_mission = this.mission_list[mission_num];
            this.mission_list.splice(mission_num,1);
            this.mission_list.unshift(first_mission);
            this.agin_mission();
        },
    },
    created() {},
});
