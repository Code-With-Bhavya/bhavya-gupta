"use client";
import React, { useEffect, useRef, useState } from "react";
import Matter from 'matter-js';
import 'matter-attractors';
import 'matter-wrap';



const MatterSimulation = () => {
  const canvasRef = useRef(null);
  const [userisonmobile, setUserisonmobile] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    Matter.use("matter-attractors");
    Matter.use("matter-wrap");

    function runMatter() {
      isMobileDevice();
      // module aliases
      const { Engine, Events, Runner, Render, World, Body, Mouse, Common, Bodies, Composite } = Matter;

      // create engine
      const engine = Engine.create();

      engine.world.gravity.y = 0;
      engine.world.gravity.x = 0;
      engine.world.gravity.scale = 0.1;

      // create renderer
      const render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
          showVelocity: false,
          width: dimensions.width,
          height: dimensions.height,
          wireframes: false,
          background: "transparent",
        },
      });

      // create runner
      const runner = Runner.create();

      // create demo scene
      const world = engine.world;
      world.gravity.scale = 0;

      // create a body with an attractor
      const attractiveBody = Bodies.circle(
        render.options.width / 2,
        render.options.height / 2,
        Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
        {
          render: {
            fillStyle: `rgba(253, 111, 0, 0.4)`,
            lineWidth: 0,
            zIndex: 1000,
          },
          isStatic: true,
          plugin: {
            attractors: [
              function (bodyA, bodyB) {
                return {
                  x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                  y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                };
              },
            ],
          },
        }
      );

      World.add(world, attractiveBody);

      // add some bodies that to be attracted
      const bodies = userisonmobile ? 10 : 60;
      for (let i = 0; i < bodies; i += 1) {
        let x = Common.random(0, render.options.width);
        let y = Common.random(0, render.options.height);
        let s = userisonmobile ? Common.random(5, 30) : Common.random(10, 80);
        let polygonNumber = Common.random(3, 6);
  
        const body = Bodies.polygon(x, y, polygonNumber, s, {
          mass: s / 20,
          friction: 0,
          frictionAir: 0.02,
          angle: Math.round(Math.random() * 360),
          render: {
            fillStyle: '#222222',
            strokeStyle: '#000000',
            lineWidth: 2,
          },
        });
  
        World.add(world, body);
  
        let r = Common.random(0, 1);
  
        const circle1 = Bodies.circle(x, y, userisonmobile ? Common.random(1, 4) : Common.random(2, 8), {
          mass: 0.1,
          friction: 0,
          frictionAir: 0.01,
          render: {
            fillStyle: r > 0.3 ? '#27292d' : '#444444',
            strokeStyle: '#000000',
            lineWidth: 2,
          },
        });
  
        World.add(world, circle1);
  
        const circle2 = Bodies.circle(x, y, userisonmobile ? Common.random(1, 10) : Common.random(2, 20), {
          mass: 6,
          friction: 0,
          frictionAir: 0,
          render: {
            fillStyle: r > 0.3 ? '#334443' : '#222222',
            strokeStyle: '#111111',
            lineWidth: 4,
          },
        });
  
        World.add(world, circle2);
  
        const circle3 = Bodies.circle(x, y, userisonmobile ? Common.random(1, 20) : Common.random(2, 30), {
          mass: 0.2,
          friction: 0.6,
          frictionAir: 0.8,
          render: {
            fillStyle: '#191919',
            strokeStyle: '#111111',
            lineWidth: 3,
          },
        });
  
        World.add(world, circle3);
      }

      // add mouse control
      const mouse = Mouse.create(render.canvas);



      if (userisonmobile) {
        Events.on(engine, 'afterUpdate', function () {
          const randomX = Common.random(0, render.options.width);
          const randomY = Common.random(0, render.options.height);
          Body.translate(attractiveBody, {
            x: (randomX - attractiveBody.position.x) * 0.12,
            y: (randomY - attractiveBody.position.y) * 0.12,
          });
        });
      }
      else {
        Events.on(engine, "afterUpdate", function () {
          if (!mouse.position.x) return;
          // smoothly move the attractor body towards the mouse
          Body.translate(attractiveBody, {
            x: (mouse.position.x - attractiveBody.position.x) * 0.12,
            y: (mouse.position.y - attractiveBody.position.y) * 0.12,
          });
        });
      }

      // return a context for MatterDemo to control
      const data = {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function () {
          Matter.Render.stop(render);
          Matter.Runner.stop(runner);
        },
        play: function () {
          Matter.Runner.run(runner, engine);
          Matter.Render.run(render);
        },
      };

      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
      return data;
    }


    //Return TRUE if user is on mobile
    function isMobileDevice() {
      if (window.innerWidth <= 1000) {
        setUserisonmobile(true);
      }
    }

    function debounce(func, wait, immediate) {
      let timeout = null;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    let m = runMatter();

    function setWindowSize() {
      const dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      if (m.render.canvas) {
        m.render.canvas.width = window.innerWidth;
        m.render.canvas.height = window.innerHeight;
      }
      return dimensions;
    }

    setWindowSize();
    window.addEventListener("resize", debounce(setWindowSize, 250));


    const handleWheel = (e) => {
      e.stopPropagation();
      window.scrollBy(0, e.deltaY);
    };

    window.addEventListener("mousewheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("mousewheel", handleWheel);
      window.removeEventListener("resize", debounce(setWindowSize, 250));
      if (m) {
        m.stop();
        if (m.render.canvas) {
          m.render.canvas.remove();
        }
      }
    };
  }, []);

  return <canvas ref={canvasRef}  className="w-full h-full absolute top-0 left-0 z-10 pointer-events-none md:pointer-events-auto" />;
};

export default MatterSimulation;
