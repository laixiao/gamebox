/**
 * 自定义抖动动作
 */
var circleMoveAction = cc.Class({
    name: "cc.circleMoveAction",
    extends: cc.ActionInterval,

    // //圆心位置
    // centerPos: cc.v2(0, 0),
    // //当前运动缩放
    // currentScale: 1.0,
    // //运动缩放
    // scaleDiff:0,
    // //角度
    // angle: 0,
    ctor:function(duration,center,scale, angle){
        // cc.ActionInterval.prototype.ctor.call(this);
        // this.duration = duration;

        this.centerPos = cc.v2(0, 0);
        this.currentScale = 1.0;
        this.scaleDiff = 0;
        this.angle = 0;

        this.initWithDuration(duration, center, scale, angle);

    },
    update:function(dt){
        dt = this._computeEaseTime(dt);
        // console.log(dt);
        this.currentScale += this.scaleDiff;

        // var newPos = cc.pRotateByAngle(this.nodeInitialPos, this.centerPos, this.angle * dt / 180 * Math.PI);
        // var newPos = this.nodeInitialPos.rotate(this.angle * dt / 180 * Math.PI, this.centerPos);
        var newPos = this.nodeInitialPos.sub(this.centerPos);
        newPos.rotateSelf(this.angle * dt / 180 * Math.PI);
        newPos.addSelf(this.centerPos);

        this.target.setPosition(newPos);
    },
    initWithDuration:function(duration, center, scale, angle){
        if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
            this.centerPos = center;
            this.scaleDiff = scale;
            this.angle = angle;
            this.currentScale = 1.0;

            return true;
        }
        return false;
    },
    startWithTarget:function(target){
        cc.ActionInterval.prototype.startWithTarget.call(this, target);
        this.nodeInitialPos=target.getPosition();
    },
    stop:function(){
        //this.target.setPosition(this.nodeInitialPos);
    }
});
/**
 * 自定义圆周运动动作
 * @param {float}duration 抖动时间
 * @param {number}center 圆心
 * @param {number}scale 每帧差值
 * @param {number}angle 运动角度
 * @returns {Shake}
 */
cc.circleMoveAction = function(duration, center, scale, angle){
    return new circleMoveAction(duration, center, scale, angle);
};








// cc.MoveBy = cc.Class({
//     name: 'cc.MoveBy',
//     extends: cc.ActionInterval,

//     ctor:function (duration, deltaPos, deltaY) {
//         this._positionDelta = cc.v2(0, 0);
//         this._startPosition = cc.v2(0, 0);
//         this._previousPosition = cc.v2(0, 0);

//         deltaPos !== undefined && cc.MoveBy.prototype.initWithDuration.call(this, duration, deltaPos, deltaY);	
//     },

//     /*
//      * Initializes the action.
//      * @param {Number} duration duration in seconds
//      * @param {Vec2} position
//      * @param {Number} [y]
//      * @return {Boolean}
//      */
//     initWithDuration:function (duration, position, y) {
//         if (cc.ActionInterval.prototype.initWithDuration.call(this, duration)) {
// 	        if(position.x !== undefined) {
// 		        y = position.y;
// 		        position = position.x;
// 	        }

//             this._positionDelta.x = position;
//             this._positionDelta.y = y;
//             return true;
//         }
//         return false;
//     },

//     clone:function () {
//         var action = new cc.MoveBy();
//         this._cloneDecoration(action);
//         action.initWithDuration(this._duration, this._positionDelta);
//         return action;
//     },

//     startWithTarget:function (target) {
//         cc.ActionInterval.prototype.startWithTarget.call(this, target);
//         var locPosX = target.x;
//         var locPosY = target.y;
//         this._previousPosition.x = locPosX;
//         this._previousPosition.y = locPosY;
//         this._startPosition.x = locPosX;
//         this._startPosition.y = locPosY;
//     },

//     update:function (dt) {
//         dt = this._computeEaseTime(dt);
//         if (this.target) {
//             var x = this._positionDelta.x * dt;
//             var y = this._positionDelta.y * dt;
//             var locStartPosition = this._startPosition;
//             if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
//                 var targetX = this.target.x;
//                 var targetY = this.target.y;
//                 var locPreviousPosition = this._previousPosition;

//                 locStartPosition.x = locStartPosition.x + targetX - locPreviousPosition.x;
//                 locStartPosition.y = locStartPosition.y + targetY - locPreviousPosition.y;
//                 x = x + locStartPosition.x;
//                 y = y + locStartPosition.y;
// 	            locPreviousPosition.x = x;
// 	            locPreviousPosition.y = y;
// 	            this.target.setPosition(x, y);
//             } else {
//                 this.target.setPosition(locStartPosition.x + x, locStartPosition.y + y);
//             }
//         }
//     },

//     reverse:function () {
//         var action = new cc.MoveBy(this._duration, cc.v2(-this._positionDelta.x, -this._positionDelta.y));
//         this._cloneDecoration(action);
//         this._reverseEaseList(action);
//         return action;
//     }
// });
