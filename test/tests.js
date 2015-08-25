window.$ = require('jquery');
var chai = require('chai');
var sinon = require('sinon');
var Backbone = require('backbone');
var SuperRouter = require('../backbone.superrouter');

describe('Should route things', function(){
  beforeEach(function(){
    document.location.hash = "thisisnotarealpage";
    Backbone.history.start({silent: true});
  });

  afterEach(function(){
    SuperRouter.clear();
    Backbone.history.stop();
    console.log("---");
  });

  it('should navigate normally', function(){
    var testRan = false;
    SuperRouter.Route.create({
      url: "",
      route: function(){
        console.log("routed");
        testRan = true;
      }
    });

    chai.expect(Backbone.history.navigate("/", {trigger: true})).to.equal(true);
    chai.expect(testRan).to.equal(true);

    chai.expect(Backbone.history.navigate("/no", {trigger: true})).to.equal(false);
  });

  it('should pass url parameters properly', function(){
    var testRan = false;
    SuperRouter.Route.create({
      url: "objects/:obj_id",
      route: function(obj_id){
        console.log("routed", obj_id);
        if(obj_id == 12){
          testRan = true;
        }
      }
    });

    chai.expect(Backbone.history.navigate("/objects/12", {trigger: true})).to.equal(true);
    chai.expect(testRan).to.equal(true);
  });

  it('should pass options properly', function(){
    var testRan = false;
    SuperRouter.Route.create({
      url: "objects/:obj_id",
      route: function(obj_id){
        console.log("routed", this.options);
        if(this.options.dialog){
          testRan = true;
        }
      }
    });

    chai.expect(Backbone.history.navigate("/objects/12",
      {trigger: true, dialog: true})).to.equal(true);
    chai.expect(testRan).to.equal(true);
  });
});
