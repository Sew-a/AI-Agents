// Smoking Weed Simulator - Core Game Logic

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Load image assets from workspace
const tilesetImg = new Image();
tilesetImg.src = 'tileset.jpg';

const facesImg = new Image();
facesImg.src = 'faces.jpg';

// Speaker portrait offsets in faces.jpg (10 columns, 12 rows)
const PORTRAITS = {
  "Vahe": { x: 22.22, y: 0 },
  "Karen": { x: 44.44, y: 0 },
  "Grish": { x: 66.66, y: 0 },
  "Mr. Petrosian": { x: 11.11, y: 9.09 },
  "Player": { x: 0, y: 0 }
};

// Game States
const STATES = {
  INTRO_PISS: 0,
  INTRO_TALK: 1,
  INTRO_SMOKE: 2,
  INTRO_WATER: 3,
  INTRO_WINDOW: 4,
  INTRO_SNACKS: 5,
  INTRO_MUSIC: 6,
  INTRO_CONVO: 7,
  INTRO_MUSHROOMS: 8,
  INTRO_COFFEE: 9,
  MUSHROOM_RUN: 10,
  MUSHROOM_BOSS: 11,
  RETURN_DIZZY: 12,
  RETURN_WASH: 13,
  RETURN_BEER: 14,
  RETURN_SMOKE2: 15,
  RETURN_DANCE: 16,
  RETURN_NEIGHBOUR: 17,
  RETURN_COUCH: 18,
  LABYRINTH: 19,
  FINAL_ROOM: 20,
  GAME_OVER: 21,
  GAME_COMPLETE: 22
};

// Global Game Variables
let canvas, ctx;
let gameState = STATES.INTRO_PISS;
let keys = {};
let mouse = { x: 0, y: 0 };
let lastTime = 0;

// Camera
let camera = { x: 0, y: 0, targetX: 0, targetY: 0, angle: 0, shake: 0 };

// Player entity
let player = {
  x: 100,
  y: 700,
  radius: 16,
  angle: 0,
  speed: 3.5,
  hasWater: false,
  hasSnacks: false,
  hasCoffee: false,
  hasChaynik: false,
  isPissing: false,
  pissLevel: 100,
  dizziness: 0.0,
  highness: 0.0,
  health: 100
};

// Friends satisfaction
let friendsSatisfaction = 80.0;

// Smoke density
let smokeDensity = 0.0;
let windowOpen = false;
let musicPlaying = false;
let neighboursAngered = false;

// Task Checklist
let taskList = [];
let activeTaskId = 'piss';

// Dialog State
let dialogue = {
  active: false,
  speaker: "",
  text: "",
  options: []
};

// Interactive objects definitions
let objects = [];
let walls = [];
let particles = [];
let npcs = [];
let enemies = [];
let boss = null;
let activeRoom = "bathroom"; // track current area

// Labyrinth tracking
let labyrinthStage = 1;

// Particles definition
class Particle {
  constructor(x, y, vx, vy, color, size, life, type = 'generic') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.size = size;
    this.maxLife = life;
    this.life = life;
    this.type = type;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
    if (this.type === 'smoke') {
      this.size += 0.25;
      this.vx *= 0.98;
      this.vy *= 0.98;
    }
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Dialog options handler
function setDialogue(speaker, text, options) {
  dialogue.active = true;
  dialogue.speaker = speaker;
  dialogue.text = text;
  dialogue.options = options;
  
  const box = document.getElementById('dialogue-box');
  const nameEl = document.getElementById('speaker-name');
  const textEl = document.getElementById('dialogue-text');
  const optsContainer = document.getElementById('dialogue-options');
  
  nameEl.textContent = speaker;
  textEl.textContent = text;
  optsContainer.innerHTML = '';
  
  // Set speaker portrait coordinates
  const portraitEl = document.getElementById('dialogue-portrait');
  if (portraitEl) {
    const pos = PORTRAITS[speaker] || PORTRAITS["Player"];
    portraitEl.style.backgroundPosition = `${pos.x}% ${pos.y}%`;
  }
  
  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'dialogue-opt';
    btn.textContent = `${idx + 1}. ${opt.text}`;
    btn.addEventListener('click', () => {
      dialogue.active = false;
      box.classList.add('hidden');
      opt.callback();
    });
    optsContainer.appendChild(btn);
  });
  
  box.classList.remove('hidden');
}

// Create toasts
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Build Walls for maps
function buildHouseWalls() {
  walls = [];
  // Outer Borders
  walls.push({ x1: 20, y1: 20, x2: 780, y2: 20 }); // Top
  walls.push({ x1: 20, y1: 20, x2: 20, y2: 780 }); // Left
  walls.push({ x1: 780, y1: 20, x2: 780, y2: 780 }); // Right
  walls.push({ x1: 20, y1: 780, x2: 780, y2: 780 }); // Bottom

  // Horizontal separator between Zal/Bedroom and Bathroom/Kitchen
  // From 20 to 780, y = 450. Openings for Doors:
  // Bedroom door: 80 to 140
  // Zal/Kitchen connector archway: 540 to 620
  walls.push({ x1: 20, y1: 450, x2: 80, y2: 450 });
  walls.push({ x1: 140, y1: 450, x2: 540, y2: 450 });
  walls.push({ x1: 620, y1: 450, x2: 780, y2: 450 });

  // Vertical partition between Bedroom and Zal (x = 300, y = 20 to 450)
  // Archway / door at y = 250 to 320
  walls.push({ x1: 300, y1: 20, x2: 300, y2: 250 });
  walls.push({ x1: 300, y1: 320, x2: 300, y2: 450 });

  // Vertical partition between Corridor and Bathroom (x = 240, y = 450 to 780)
  // Door: y = 520 to 590
  walls.push({ x1: 240, y1: 450, x2: 240, y2: 520 });
  walls.push({ x1: 240, y1: 590, x2: 240, y2: 780 });

  // Vertical partition between Bathroom and Kitchen (x = 480, y = 450 to 780)
  // Door: y = 600 to 670
  walls.push({ x1: 480, y1: 450, x2: 480, y2: 600 });
  walls.push({ x1: 480, y1: 670, x2: 480, y2: 780 });
}

function buildMushroomCorridorWalls() {
  walls = [];
  // Corridors will guide the player in a winding path:
  // (Left Corridor) -> (Top Corridor) -> (Right Arena)
  walls.push({ x1: 20, y1: 20, x2: 780, y2: 20 });
  walls.push({ x1: 20, y1: 20, x2: 20, y2: 780 });
  walls.push({ x1: 780, y1: 20, x2: 780, y2: 780 });
  walls.push({ x1: 20, y1: 780, x2: 780, y2: 780 });

  // Winding channel barriers
  walls.push({ x1: 180, y1: 200, x2: 180, y2: 780 });
  walls.push({ x1: 340, y1: 20, x2: 340, y2: 600 });
  walls.push({ x1: 520, y1: 200, x2: 520, y2: 780 });
}

function buildLabyrinthWalls() {
  walls = [];
  // Loop map with simple walls: square room with left/right door exits
  walls.push({ x1: 100, y1: 100, x2: 700, y2: 100 });
  walls.push({ x1: 100, y1: 100, x2: 100, y2: 700 });
  walls.push({ x1: 700, y1: 100, x2: 700, y2: 700 });
  walls.push({ x1: 100, y1: 700, x2: 700, y2: 700 });

  // Center blocking pillar
  walls.push({ x1: 320, y1: 320, x2: 480, y2: 320 });
  walls.push({ x1: 320, y1: 320, x2: 320, y2: 480 });
  walls.push({ x1: 480, y1: 320, x2: 480, y2: 480 });
  walls.push({ x1: 320, y1: 480, x2: 480, y2: 480 });
}

// Build list of interactive hotspots
function resetInteractiveObjects() {
  objects = [];
  
  if (gameState < STATES.MUSHROOM_RUN || (gameState >= STATES.RETURN_DIZZY && gameState < STATES.LABYRINTH)) {
    // Household Objects
    objects.push({ id: 'toilet', name: 'Toilet', x: 360, y: 730, r: 35, color: '#e0e0ff' });
    objects.push({ id: 'sink', name: 'Sink', x: 280, y: 480, r: 30, color: '#e0e0ff' });
    objects.push({ id: 'fridge', name: 'Fridge', x: 740, y: 720, r: 35, color: '#fffb00' });
    objects.push({ id: 'stove', name: 'Stove & Kettle', x: 680, y: 740, r: 30, color: '#ff5500' });
    objects.push({ id: 'couch', name: 'Couch & Crew', x: 560, y: 220, r: 60, color: '#a855f7' });
    objects.push({ id: 'notebook', name: 'Notebook', x: 420, y: 140, r: 30, color: '#00f3ff' });
    objects.push({ id: 'window', name: 'Living Room Window', x: 770, y: 280, r: 40, color: '#ff007f' });
    objects.push({ id: 'wardrobe', name: 'Wardrobe', x: 240, y: 100, r: 35, color: '#d97706' });
    objects.push({ id: 'outside_door', name: 'Front Door', x: 30, y: 720, r: 35, color: '#10b981' });
  } else if (gameState === STATES.LABYRINTH) {
    // Two magical loop doors
    objects.push({ id: 'door_a', name: 'Neon Door A (Left)', x: 180, y: 200, r: 40, color: '#ff007f' });
    objects.push({ id: 'door_b', name: 'Neon Door B (Right)', x: 620, y: 200, r: 40, color: '#00f3ff' });
  }
}

// Set list of tasks sequentially
function rebuildTaskList() {
  const container = document.getElementById('task-list');
  container.innerHTML = '';
  
  taskList = [
    { id: 'piss', text: 'Finish peeing in bathroom (Hold [E])', done: player.pissLevel <= 0 },
    { id: 'talk', text: 'Go to Zal and talk to friends', done: gameState > STATES.INTRO_TALK },
    { id: 'smoke', text: 'Smoke weed with crew (Press [E] on Couch)', done: gameState > STATES.INTRO_SMOKE },
    { id: 'water', text: 'Fetch cold water from Kitchen fridge', done: player.hasWater || gameState > STATES.INTRO_WATER },
    { id: 'give_water', text: 'Give water to friends on Couch', done: gameState > STATES.INTRO_WATER },
    { id: 'window', text: 'Open the Zal window to clear smoke', done: windowOpen || gameState > STATES.INTRO_WINDOW },
    { id: 'snacks', text: 'Fetch snacks from bedroom Wardrobe', done: player.hasSnacks || gameState > STATES.INTRO_SNACKS },
    { id: 'give_snacks', text: 'Share snacks on Couch', done: gameState > STATES.INTRO_SNACKS },
    { id: 'music', text: 'Play some synth tunes on laptop', done: musicPlaying || gameState > STATES.INTRO_MUSIC },
    { id: 'convo', text: 'Interact with crew on couch', done: gameState > STATES.INTRO_CONVO },
    { id: 'mushrooms', text: 'Eat Vahe\'s magical mushrooms', done: gameState > STATES.INTRO_MUSHROOMS },
    { id: 'coffee', text: 'Head to Kitchen to brew coffee', done: gameState > STATES.INTRO_COFFEE },
    
    // Phase 2
    { id: 'corridors', text: 'Beat corridors using the Chaynik kettle', done: gameState > STATES.MUSHROOM_RUN },
    { id: 'boss', text: 'Defeat the Giant Chaynik Boss!', done: gameState > STATES.MUSHROOM_BOSS },

    // Phase 3
    { id: 'wash', text: 'Wash dizzy face at bathroom sink', done: player.dizziness < 0.1 && gameState > STATES.RETURN_DIZZY },
    { id: 'beer', text: 'Fetch and drink beer from fridge', done: gameState > STATES.RETURN_BEER },
    { id: 'smoke_again', text: 'Have a second smoke on couch', done: gameState > STATES.RETURN_SMOKE2 },
    { id: 'dance', text: 'Headbang near laptop to the music', done: gameState > STATES.RETURN_DANCE },
    { id: 'neighbour', text: 'Open front door and handle neighbour', done: gameState > STATES.RETURN_NEIGHBOUR },
    { id: 'couch_end', text: 'Join crew for one final joint', done: gameState > STATES.RETURN_COUCH },

    // Phase 4
    { id: 'labyrinth', text: 'Navigate loop doors in Labyrinth', done: gameState > STATES.LABYRINTH },
    { id: 'ending', text: 'Erase the illusion (Kill friends)', done: gameState > STATES.FINAL_ROOM }
  ];

  // Determine active task based on state
  if (gameState === STATES.INTRO_PISS) activeTaskId = 'piss';
  else if (gameState === STATES.INTRO_TALK) activeTaskId = 'talk';
  else if (gameState === STATES.INTRO_SMOKE) activeTaskId = 'smoke';
  else if (gameState === STATES.INTRO_WATER && !player.hasWater) activeTaskId = 'water';
  else if (gameState === STATES.INTRO_WATER && player.hasWater) activeTaskId = 'give_water';
  else if (gameState === STATES.INTRO_WINDOW) activeTaskId = 'window';
  else if (gameState === STATES.INTRO_SNACKS && !player.hasSnacks) activeTaskId = 'snacks';
  else if (gameState === STATES.INTRO_SNACKS && player.hasSnacks) activeTaskId = 'give_snacks';
  else if (gameState === STATES.INTRO_MUSIC) activeTaskId = 'music';
  else if (gameState === STATES.INTRO_CONVO) activeTaskId = 'convo';
  else if (gameState === STATES.INTRO_MUSHROOMS) activeTaskId = 'mushrooms';
  else if (gameState === STATES.INTRO_COFFEE) activeTaskId = 'coffee';
  else if (gameState === STATES.MUSHROOM_RUN) activeTaskId = 'corridors';
  else if (gameState === STATES.MUSHROOM_BOSS) activeTaskId = 'boss';
  else if (gameState === STATES.RETURN_DIZZY) activeTaskId = 'wash';
  else if (gameState === STATES.RETURN_WASH) activeTaskId = 'wash';
  else if (gameState === STATES.RETURN_BEER) activeTaskId = 'beer';
  else if (gameState === STATES.RETURN_SMOKE2) activeTaskId = 'smoke_again';
  else if (gameState === STATES.RETURN_DANCE) activeTaskId = 'dance';
  else if (gameState === STATES.RETURN_NEIGHBOUR) activeTaskId = 'neighbour';
  else if (gameState === STATES.RETURN_COUCH) activeTaskId = 'couch_end';
  else if (gameState === STATES.LABYRINTH) activeTaskId = 'labyrinth';
  else if (gameState === STATES.FINAL_ROOM) activeTaskId = 'ending';

  // Filter tasks to show: completed tasks + current active task
  let activeIndex = taskList.findIndex(t => t.id === activeTaskId);
  let tasksToRender = [];
  
  if (activeIndex !== -1) {
    // Show last 2 completed + current + next 1
    let startIdx = Math.max(0, activeIndex - 2);
    let endIdx = Math.min(taskList.length - 1, activeIndex + 1);
    for (let i = startIdx; i <= endIdx; i++) {
      tasksToRender.push(taskList[i]);
    }
  } else {
    tasksToRender = taskList.slice(0, 4);
  }

  tasksToRender.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' completed' : '') + (t.id === activeTaskId ? ' active' : '');
    
    const checkbox = document.createElement('span');
    checkbox.className = 'task-checkbox';
    
    const label = document.createElement('span');
    label.textContent = t.text;
    
    li.appendChild(checkbox);
    li.appendChild(label);
    container.appendChild(li);
  });
}

// Reset Game State
function initGame() {
  player.x = 100;
  player.y = 700;
  player.angle = 0;
  player.pissLevel = 100;
  player.isPissing = false;
  player.hasWater = false;
  player.hasSnacks = false;
  player.hasCoffee = false;
  player.hasChaynik = false;
  player.dizziness = 0.0;
  player.highness = 0.0;
  player.health = 100;
  
  friendsSatisfaction = 80.0;
  smokeDensity = 0.0;
  windowOpen = false;
  musicPlaying = false;
  neighboursAngered = false;
  labyrinthStage = 1;
  boss = null;
  enemies = [];
  particles = [];
  
  activeRoom = "bathroom";
  buildHouseWalls();
  resetInteractiveObjects();
  
  // Setup Friends / NPCs
  npcs = [
    { id: 'vahe', name: 'Vahe', x: 520, y: 220, state: 'sit', color: '#39ff14', headBob: 0, panicOffset: 0 },
    { id: 'karen', name: 'Karen', x: 560, y: 220, state: 'sit', color: '#bd00ff', headBob: 0, eatCount: 0 },
    { id: 'grish', name: 'Grish', x: 600, y: 220, state: 'sit', color: '#ff007f', headBob: 0 }
  ];
  
  rebuildTaskList();
  document.getElementById('satisfaction-bar').style.width = '80%';
}

// Start simulation button
document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('hud').classList.remove('hidden');
  audio.init();
  initGame();
});

// Restart button
document.getElementById('restart-btn').addEventListener('click', () => {
  document.getElementById('game-over-screen').classList.add('hidden');
  audio.stopDrone();
  audio.stopMusic();
  initGame();
});

// Reload button
document.getElementById('reload-btn').addEventListener('click', () => {
  document.getElementById('game-complete-screen').classList.add('hidden');
  audio.stopDrone();
  audio.stopMusic();
  initGame();
});

// Handle user inputs
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
  
  // Quick Dialog option choice via keys 1, 2, 3
  if (dialogue.active) {
    if (e.key === '1' && dialogue.options[0]) dialogue.options[0].callback();
    if (e.key === '2' && dialogue.options[1]) dialogue.options[1].callback();
    if (e.key === '3' && dialogue.options[2]) dialogue.options[2].callback();
  }
  
  // Toggle debug menu using F2 key
  if (e.key === 'f2') {
    debugSkipState();
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Mouse input
window.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (e.clientX - rect.left) * (CANVAS_WIDTH / rect.width);
  mouse.y = (e.clientY - rect.top) * (CANVAS_HEIGHT / rect.height);
});

window.addEventListener('mousedown', (e) => {
  if (e.button === 0) { // Left Click
    handlePlayerAttack();
  }
});

// Skip state for testing/debugging
function debugSkipState() {
  showToast("DEBUG: Skipped to next state!");
  if (gameState === STATES.INTRO_PISS) {
    player.pissLevel = 0;
    audio.stopPee();
    gameState = STATES.INTRO_TALK;
  } else if (gameState === STATES.INTRO_TALK) {
    gameState = STATES.INTRO_SMOKE;
  } else if (gameState === STATES.INTRO_SMOKE) {
    gameState = STATES.INTRO_WATER;
  } else if (gameState === STATES.INTRO_WATER) {
    gameState = STATES.INTRO_WINDOW;
  } else if (gameState === STATES.INTRO_WINDOW) {
    gameState = STATES.INTRO_SNACKS;
  } else if (gameState === STATES.INTRO_SNACKS) {
    gameState = STATES.INTRO_MUSIC;
  } else if (gameState === STATES.INTRO_MUSIC) {
    gameState = STATES.INTRO_CONVO;
  } else if (gameState === STATES.INTRO_CONVO) {
    gameState = STATES.INTRO_MUSHROOMS;
  } else if (gameState === STATES.INTRO_MUSHROOMS) {
    gameState = STATES.INTRO_COFFEE;
  } else if (gameState === STATES.INTRO_COFFEE) {
    startMushroomPhase();
  } else if (gameState === STATES.MUSHROOM_RUN) {
    gameState = STATES.MUSHROOM_BOSS;
    spawnBoss();
  } else if (gameState === STATES.MUSHROOM_BOSS) {
    beatBoss();
  } else if (gameState === STATES.RETURN_DIZZY) {
    gameState = STATES.RETURN_WASH;
  } else if (gameState === STATES.RETURN_WASH) {
    gameState = STATES.RETURN_BEER;
  } else if (gameState === STATES.RETURN_BEER) {
    gameState = STATES.RETURN_SMOKE2;
  } else if (gameState === STATES.RETURN_SMOKE2) {
    gameState = STATES.RETURN_DANCE;
  } else if (gameState === STATES.RETURN_DANCE) {
    gameState = STATES.RETURN_NEIGHBOUR;
    audio.playSFX('knock');
  } else if (gameState === STATES.RETURN_NEIGHBOUR) {
    gameState = STATES.RETURN_COUCH;
  } else if (gameState === STATES.RETURN_COUCH) {
    startLabyrinthPhase();
  } else if (gameState === STATES.LABYRINTH) {
    gameState = STATES.FINAL_ROOM;
    startFinalRoom();
  } else if (gameState === STATES.FINAL_ROOM) {
    gameState = STATES.GAME_COMPLETE;
    document.getElementById('game-complete-screen').classList.remove('hidden');
  }
  
  resetInteractiveObjects();
  rebuildTaskList();
}

// Attack logic in Phase 2
function handlePlayerAttack() {
  if (gameState !== STATES.MUSHROOM_RUN && gameState !== STATES.MUSHROOM_BOSS && gameState !== STATES.FINAL_ROOM) return;
  
  // Swing chaynik / weapon SFX
  audio.playSFX('swing');
  
  // Camera shake
  camera.shake = 10;
  
  // Hit swing arc visual effect particle
  const arcX = player.x + Math.cos(player.angle) * 25;
  const arcY = player.y + Math.sin(player.angle) * 25;
  for (let i = 0; i < 8; i++) {
    const angle = player.angle + (Math.random() - 0.5) * 1.2;
    const v = 3 + Math.random() * 3;
    particles.push(new Particle(
      arcX, arcY,
      Math.cos(angle) * v, Math.sin(angle) * v,
      gameState === STATES.FINAL_ROOM ? '#ff0000' : '#ffffff',
      2 + Math.random() * 2,
      12 + Math.random() * 6
    ));
  }

  // Combat collision checks
  if (gameState === STATES.MUSHROOM_RUN) {
    enemies.forEach((enemy) => {
      if (enemy.alive) {
        const dx = enemy.x - player.x;
        const dy = enemy.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Attack hit range
        if (dist < 55) {
          // Angle check
          const angleToEnemy = Math.atan2(dy, dx);
          let diff = Math.abs(player.angle - angleToEnemy);
          if (diff > Math.PI) diff = Math.PI * 2 - diff;
          
          if (diff < 1.2) { // 70 degree front cone
            enemy.alive = false;
            audio.playSFX('hit');
            // spawn splash
            spawnBloodParticles(enemy.x, enemy.y, 15);
          }
        }
      }
    });
  } else if (gameState === STATES.MUSHROOM_BOSS && boss) {
    const dx = boss.x - player.x;
    const dy = boss.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 80) {
      const angleToBoss = Math.atan2(dy, dx);
      let diff = Math.abs(player.angle - angleToBoss);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;
      
      if (diff < 1.2) {
        boss.health -= 10;
        audio.playSFX('hit');
        camera.shake = 18;
        spawnSparkParticles(boss.x, boss.y, 20);
        
        if (boss.health <= 0) {
          beatBoss();
        }
      }
    }
  } else if (gameState === STATES.FINAL_ROOM) {
    // Kill friends on touch
    npcs.forEach(npc => {
      if (npc.state !== 'dead') {
        const dx = npc.x - player.x;
        const dy = npc.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 50) {
          const angleToNpc = Math.atan2(dy, dx);
          let diff = Math.abs(player.angle - angleToNpc);
          if (diff > Math.PI) diff = Math.PI * 2 - diff;
          
          if (diff < 1.2) {
            npc.state = 'dead';
            audio.playSFX('hit');
            spawnBloodParticles(npc.x, npc.y, 30);
            showToast(`You killed ${npc.name}!`);
            
            // Check if all dead
            if (npcs.every(n => n.state === 'dead')) {
              setTimeout(() => {
                gameState = STATES.GAME_COMPLETE;
                document.getElementById('hud').classList.add('hidden');
                document.getElementById('game-complete-screen').classList.remove('hidden');
                audio.stopMusic();
              }, 2000);
            }
          }
        }
      }
    });
  }
}

function spawnBloodParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = 1 + Math.random() * 4;
    particles.push(new Particle(
      x, y,
      Math.cos(a) * v, Math.sin(a) * v,
      '#e11d48',
      3 + Math.random() * 4,
      30 + Math.random() * 20
    ));
  }
}

function spawnSparkParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = 2 + Math.random() * 5;
    particles.push(new Particle(
      x, y,
      Math.cos(a) * v, Math.sin(a) * v,
      '#fbbf24',
      2 + Math.random() * 2,
      15 + Math.random() * 15
    ));
  }
}

// Logic transition functions
function startMushroomPhase() {
  gameState = STATES.MUSHROOM_RUN;
  player.hasChaynik = true;
  player.x = 80;
  player.y = 700;
  
  buildMushroomCorridorWalls();
  resetInteractiveObjects();
  
  // Spawn enemies at hallway intersections
  enemies = [
    { x: 100, y: 350, r: 16, vx: 0, vy: 0, alive: true, face: 'vahe', speed: 1.8 },
    { x: 260, y: 550, r: 16, vx: 0, vy: 0, alive: true, face: 'karen', speed: 1.8 },
    { x: 260, y: 250, r: 16, vx: 0, vy: 0, alive: true, face: 'grish', speed: 1.8 },
    { x: 420, y: 150, r: 16, vx: 0, vy: 0, alive: true, face: 'vahe', speed: 2.0 },
    { x: 420, y: 650, r: 16, vx: 0, vy: 0, alive: true, face: 'karen', speed: 2.0 },
    { x: 620, y: 500, r: 16, vx: 0, vy: 0, alive: true, face: 'grish', speed: 2.2 }
  ];
  
  audio.startDrone();
  showToast("THE MUSHROOMS HAVE TAKEN OVER");
  rebuildTaskList();
}

function spawnBoss() {
  gameState = STATES.MUSHROOM_BOSS;
  boss = {
    x: 650,
    y: 200,
    r: 35,
    maxHealth: 100,
    health: 100,
    kickCooldown: 0,
    speed: 1.5,
    stunned: 0
  };
  showToast("BOSS ENCOUNTER: THE GIANT CHAYNIK");
  rebuildTaskList();
}

function beatBoss() {
  // Explosion effect
  spawnSparkParticles(boss.x, boss.y, 60);
  camera.shake = 30;
  boss = null;
  
  // Fade to black and return to house
  showToast("Illusion defeated. Returning to reality...");
  
  setTimeout(() => {
    gameState = STATES.RETURN_DIZZY;
    player.hasChaynik = false;
    player.hasCoffee = true;
    player.dizziness = 1.0;
    player.x = 680; // in kitchen
    player.y = 700;
    
    // Reset NPCs locations back to normal
    npcs.forEach(n => {
      n.state = 'sit';
      n.x = n.id === 'vahe' ? 520 : n.id === 'karen' ? 560 : 600;
      n.y = 220;
    });

    buildHouseWalls();
    resetInteractiveObjects();
    rebuildTaskList();
    
    audio.stopDrone();
    audio.startDizzyDroning();
  }, 2000);
}

function startLabyrinthPhase() {
  gameState = STATES.LABYRINTH;
  labyrinthStage = 1;
  player.x = 400;
  player.y = 550;
  
  buildLabyrinthWalls();
  resetInteractiveObjects();
  rebuildTaskList();
  
  audio.startDrone();
  showToast("THE LABYRINTH OF TRUTH");
}

function startFinalRoom() {
  gameState = STATES.FINAL_ROOM;
  player.x = 400;
  player.y = 550;
  
  // Keep same walls but remove center pillar and loop doors
  walls = [
    { x1: 100, y1: 100, x2: 700, y2: 100 },
    { x1: 100, y1: 100, x2: 100, y2: 700 },
    { x1: 700, y1: 100, x2: 700, y2: 700 },
    { x1: 100, y1: 700, x2: 700, y2: 700 }
  ];
  objects = [];
  
  // Put friends in a circle in the center
  npcs = [
    { id: 'vahe', name: 'Vahe', x: 340, y: 350, state: 'panic', color: '#39ff14' },
    { id: 'karen', name: 'Karen', x: 400, y: 300, state: 'sit', color: '#bd00ff' },
    { id: 'grish', name: 'Grish', x: 460, y: 350, state: 'sit', color: '#ff007f' }
  ];
  
  rebuildTaskList();
  showToast("End the nightmare.");
}

// Dialogue options callback trees
function startCouchConvo() {
  setDialogue("Vahe", "Finally, man! What took you so long? Grish rolled a fat joint, come sit down and smoke!", [
    {
      text: "Hell yeah, let's get high.",
      callback: () => {
        audio.playSFX('bong');
        camera.shake = 15;
        player.highness = 0.5;
        smokeDensity = 0.6;
        gameState = STATES.INTRO_WATER;
        rebuildTaskList();
        showToast("You are getting High!");
        
        // Spawn weed smoke particles in Zal
        for(let i=0; i<30; i++) {
          particles.push(new Particle(
            500 + Math.random()*150, 180 + Math.random()*100,
            (Math.random()-0.5)*1, (Math.random()-0.5)*1,
            'rgba(180, 220, 180, 0.4)',
            15 + Math.random()*15,
            120 + Math.random()*100,
            'smoke'
          ));
        }
        
        // Schedule next request shortly
        setTimeout(() => {
          showToast("Vahe: 'Damn, my mouth is dry as sandpaper. Bring some water, bro!'");
        }, 3000);
      }
    },
    {
      text: "Sure, what are we listening to?",
      callback: () => {
        audio.playSFX('bong');
        camera.shake = 15;
        player.highness = 0.5;
        smokeDensity = 0.6;
        gameState = STATES.INTRO_WATER;
        rebuildTaskList();
        showToast("You are getting High!");
        setTimeout(() => {
          showToast("Grish: 'Weed is dry. I need some water, please!'");
        }, 3000);
      }
    }
  ]);
}

function startLoreConvo() {
  setDialogue("Karen", "Man, did you guys hear about the neighbour downstairs? He says he hears 'clanking metal kettle noises' at night. Spooky shit.", [
    {
      text: "Probably just pipes. Pass the weed.",
      callback: () => {
        friendsSatisfaction = Math.min(100, friendsSatisfaction + 15);
        gameState = STATES.INTRO_MUSHROOMS;
        rebuildTaskList();
        showToast("Satisfaction increased! Conversation flows.");
        setTimeout(() => {
          showToast("Vahe: 'Guys, look what I got from that shaman...'");
        }, 3000);
      }
    },
    {
      text: "Maybe it's a giant chaynik boss coming for us! Haha.",
      callback: () => {
        friendsSatisfaction = Math.min(100, friendsSatisfaction + 25);
        gameState = STATES.INTRO_MUSHROOMS;
        rebuildTaskList();
        showToast("Friends loved that joke!");
        setTimeout(() => {
          showToast("Vahe: 'Check out these mushrooms I got!'");
        }, 3000);
      }
    }
  ]);
}

function startMushroomConvo() {
  setDialogue("Vahe", "Alright boys, time to take it to the next level. I got these wild local mushrooms from a shaman. Everyone eat one!", [
    {
      text: "Let's do it. Bottoms up.",
      callback: () => {
        player.highness = 1.0;
        player.dizziness = 0.8;
        showToast("Hallucinations starting...");
        
        // Eerie screen distortion
        document.getElementById('satisfaction-panel').classList.add('hidden'); // satisfaction disappears
        
        // Spawn wobbly psychedelic particles
        for(let i=0; i<40; i++) {
          particles.push(new Particle(
            Math.random()*CANVAS_WIDTH, Math.random()*CANVAS_HEIGHT,
            (Math.random()-0.5)*2, (Math.random()-0.5)*2,
            'rgba(189, 0, 255, 0.4)',
            5 + Math.random()*8,
            200,
            'generic'
          ));
        }

        gameState = STATES.INTRO_COFFEE;
        rebuildTaskList();
        
        setTimeout(() => {
          showToast("Grish: 'Yo... I really need a coffee to ground me. Make a coffee.'");
        }, 4000);
      }
    }
  ]);
}

function startNeighbourConvo() {
  setDialogue("Mr. Petrosian", "Hey! What is all this smoke and loud synthwave music? I'm trying to sleep, and my ceiling is literally shaking!", [
    {
      text: "Really sorry Mr. Petrosian, we're opening windows and turning it down right now.",
      callback: () => {
        showToast("Neighbour: 'Fine, keep it down or next time I call the police!'");
        gameState = STATES.RETURN_COUCH;
        rebuildTaskList();
      }
    },
    {
      text: "Mind your own business, old man! We're vibing here!",
      callback: () => {
        showToast("Neighbour: 'That is it! I am calling the cops right now!'");
        friendsSatisfaction = Math.max(0, friendsSatisfaction - 40);
        neighboursAngered = true;
        gameState = STATES.RETURN_COUCH;
        rebuildTaskList();
      }
    },
    {
      text: "We are brewing coffee, want some?",
      callback: () => {
        showToast("Neighbour: 'I don't want coffee at 2 AM! Quiet down!'");
        gameState = STATES.RETURN_COUCH;
        rebuildTaskList();
      }
    }
  ]);
}

// Interact key E trigger action
function handlePlayerInteraction() {
  // Find closest interactive object within r range
  let closest = null;
  let minDist = 999999;
  
  objects.forEach(obj => {
    const dx = obj.x - player.x;
    const dy = obj.y - player.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < obj.r && dist < minDist) {
      minDist = dist;
      closest = obj;
    }
  });

  if (!closest) return;

  // Interacting with closets/hotspots
  if (gameState === STATES.INTRO_PISS && closest.id === 'toilet') {
    // Peeing is handled in update loop by holding key, but E ends it
    if (player.pissLevel <= 20) {
      player.pissLevel = 0;
      audio.stopPee();
      gameState = STATES.INTRO_TALK;
      rebuildTaskList();
      showToast("Pee finished. Go meet your friends!");
    } else {
      showToast("Hold [E] to finish peeing!");
    }
  }
  
  else if (gameState === STATES.INTRO_TALK && closest.id === 'couch') {
    startCouchConvo();
  }
  
  else if (gameState === STATES.INTRO_WATER && closest.id === 'fridge' && !player.hasWater) {
    player.hasWater = true;
    showToast("Water fetched! Bring it to the couch.");
    rebuildTaskList();
  }
  
  else if (gameState === STATES.INTRO_WATER && closest.id === 'couch' && player.hasWater) {
    player.hasWater = false;
    friendsSatisfaction = Math.min(100, friendsSatisfaction + 20);
    gameState = STATES.INTRO_WINDOW;
    rebuildTaskList();
    showToast("Gave water to friends. They are satisfied!");
  }
  
  else if (gameState === STATES.INTRO_WINDOW && closest.id === 'window') {
    windowOpen = true;
    smokeDensity = 0.1;
    gameState = STATES.INTRO_SNACKS;
    rebuildTaskList();
    showToast("Window opened. Smoke is clearing!");
  }
  
  else if (gameState === STATES.INTRO_SNACKS && closest.id === 'wardrobe' && !player.hasSnacks) {
    player.hasSnacks = true;
    showToast("Snacks fetched from wardrobe! Take them to couch.");
    rebuildTaskList();
  }
  
  else if (gameState === STATES.INTRO_SNACKS && closest.id === 'couch' && player.hasSnacks) {
    player.hasSnacks = false;
    friendsSatisfaction = Math.min(100, friendsSatisfaction + 15);
    gameState = STATES.INTRO_MUSIC;
    rebuildTaskList();
    showToast("Snacks shared! Now play some music.");
  }
  
  else if (gameState === STATES.INTRO_MUSIC && closest.id === 'notebook') {
    musicPlaying = true;
    audio.startMusic();
    gameState = STATES.INTRO_CONVO;
    rebuildTaskList();
    showToast("Music is playing. Synth beats start!");
  }
  
  else if (gameState === STATES.INTRO_CONVO && closest.id === 'couch') {
    startLoreConvo();
  }
  
  else if (gameState === STATES.INTRO_MUSHROOMS && closest.id === 'couch') {
    startMushroomConvo();
  }
  
  else if (gameState === STATES.INTRO_COFFEE && closest.id === 'stove') {
    showToast("Brewing coffee... wait, who turned off the lights?");
    camera.shake = 30;
    
    // Simulate blackout effect
    setTimeout(() => {
      startMushroomPhase();
    }, 1500);
  }
  
  // Phase 3 Returns
  else if (gameState === STATES.RETURN_WASH && closest.id === 'sink') {
    player.dizziness = 0.0;
    audio.stopDizzyDroning();
    gameState = STATES.RETURN_BEER;
    rebuildTaskList();
    showToast("Face washed. Dizziness cleared!");
  }
  
  else if (gameState === STATES.RETURN_BEER && closest.id === 'fridge') {
    showToast("Drinking beer... feeling warm.");
    friendsSatisfaction = Math.min(100, friendsSatisfaction + 15);
    gameState = STATES.RETURN_SMOKE2;
    rebuildTaskList();
  }
  
  else if (gameState === STATES.RETURN_SMOKE2 && closest.id === 'couch') {
    audio.playSFX('bong');
    player.highness = 0.8;
    smokeDensity = 0.7;
    friendsSatisfaction = Math.min(100, friendsSatisfaction + 10);
    gameState = STATES.RETURN_DANCE;
    rebuildTaskList();
    showToast("Smoked joint. High again!");
  }
  
  else if (gameState === STATES.RETURN_DANCE && closest.id === 'notebook') {
    showToast("Dancing and headbanging to the beats!");
    audio.setTempo(155); // Speed up music!
    npcs.forEach(n => {
      n.headBob = 10;
      if (n.id === 'vahe') n.state = 'panic'; // Vahe panics
    });
    
    gameState = STATES.RETURN_NEIGHBOUR;
    rebuildTaskList();
    
    // Queue neighbour knock after a delay
    setTimeout(() => {
      audio.playSFX('knock');
      showToast("LOUD KNOCKING ON FRONT DOOR!");
    }, 2500);
  }
  
  else if (gameState === STATES.RETURN_NEIGHBOUR && closest.id === 'outside_door') {
    startNeighbourConvo();
  }
  
  else if (gameState === STATES.RETURN_COUCH && closest.id === 'couch') {
    showToast("Sitting down for one last hit... Eyes closing.");
    audio.playSFX('bong');
    
    setTimeout(() => {
      startLabyrinthPhase();
    }, 2000);
  }
  
  // Labyrinth door triggers
  else if (gameState === STATES.LABYRINTH) {
    if (closest.id === 'door_a') { // Left door
      if (labyrinthStage === 1) {
        // Correct path leads to Stage 2
        labyrinthStage = 2;
        player.x = 400;
        player.y = 550;
        showToast("Something feels different...");
      } else if (labyrinthStage === 3) {
        // Correct path leads to Final Room!
        gameState = STATES.FINAL_ROOM;
        startFinalRoom();
      } else {
        // Loops back to stage 1
        labyrinthStage = 1;
        player.x = 400;
        player.y = 550;
        showToast("You looped back...");
      }
    } else if (closest.id === 'door_b') { // Right door
      if (labyrinthStage === 2) {
        // Correct path leads to Stage 3
        labyrinthStage = 3;
        player.x = 400;
        player.y = 550;
        showToast("Approaching the end...");
      } else {
        // Loops back
        labyrinthStage = 1;
        player.x = 400;
        player.y = 550;
        showToast("You looped back...");
      }
    }
  }
}

// Main update physics / logic loop
function update(dt) {
  // 1. Camera follow
  let camTargetX = player.x - CANVAS_WIDTH / 2;
  let camTargetY = player.y - CANVAS_HEIGHT / 2;
  camera.x += (camTargetX - camera.x) * 0.1;
  camera.y += (camTargetY - camera.y) * 0.1;
  
  // Wobbly rotation when high/dizzy
  camera.angle = Math.sin(Date.now() * 0.002) * (player.highness * 0.05 + player.dizziness * 0.05);
  
  if (camera.shake > 0) {
    camera.x += (Math.random() - 0.5) * camera.shake;
    camera.y += (Math.random() - 0.5) * camera.shake;
    camera.shake *= 0.9;
  }

  // 2. Play Highness wobbly parameters in audio
  audio.highness = player.highness;

  // 3. Dialogue check blocks movement
  if (dialogue.active) return;

  // 4. Handle Pissing hold down mechanic
  if (gameState === STATES.INTRO_PISS && keys['e']) {
    player.isPissing = true;
    player.pissLevel = Math.max(0, player.pissLevel - 0.5);
    audio.playSFX('pee');
    
    // Spawn pee splash particles
    const pissX = player.x + Math.cos(player.angle) * 12;
    const pissY = player.y + Math.sin(player.angle) * 12;
    particles.push(new Particle(
      pissX, pissY,
      Math.cos(player.angle)*2 + (Math.random()-0.5)*1, 
      Math.sin(player.angle)*2 + (Math.random()-0.5)*1,
      '#eab308',
      1.5,
      20 + Math.random()*15
    ));
    
    if (player.pissLevel <= 0) {
      player.isPissing = false;
      audio.stopPee();
      gameState = STATES.INTRO_TALK;
      rebuildTaskList();
      showToast("Pee finished. Wash hands or go to room.");
    }
  } else {
    player.isPissing = false;
    audio.stopPee();
  }

  // 5. Normal movement
  let moveX = 0;
  let moveY = 0;
  if (keys['w'] || keys['arrowup']) moveY -= 1;
  if (keys['s'] || keys['arrowdown']) moveY += 1;
  if (keys['a'] || keys['arrowleft']) moveX -= 1;
  if (keys['d'] || keys['arrowright']) moveX += 1;

  // Apply speed modifiers
  let currentSpeed = player.speed;
  if (player.dizziness > 0.3) {
    currentSpeed = player.speed * 0.55; // Headache / dizzy slows down
  }

  if (moveX !== 0 || moveY !== 0) {
    // Normalise
    const len = Math.sqrt(moveX * moveX + moveY * moveY);
    let vx = (moveX / len) * currentSpeed;
    let vy = (moveY / len) * currentSpeed;

    // Apply dizzy movement drift
    if (player.dizziness > 0.4) {
      vx += Math.sin(Date.now() * 0.005) * 0.8;
      vy += Math.cos(Date.now() * 0.005) * 0.8;
    }

    // Try moving X
    player.x += vx;
    if (checkWallCollisions(player.x, player.y, player.radius)) {
      player.x -= vx; // slide block
    }
    
    // Try moving Y
    player.y += vy;
    if (checkWallCollisions(player.x, player.y, player.radius)) {
      player.y -= vy; // slide block
    }
  }

  // Rotate to look at mouse
  const dx = mouse.x + camera.x - player.x;
  const dy = mouse.y + camera.y - player.y;
  player.angle = Math.atan2(dy, dx);

  // E key press triggers interaction
  if (keys['e']) {
    keys['e'] = false; // consume press
    handlePlayerInteraction();
  }

  // 6. Smoke decay/density physics
  if (smokeDensity > 0.05) {
    if (windowOpen) {
      smokeDensity -= 0.0003;
    } else {
      // satisfaction drops if it stays too smoky
      friendsSatisfaction = Math.max(0, friendsSatisfaction - 0.04);
    }
    
    // Generate smoke particle clouds randomly in Zal
    if (Math.random() < 0.08) {
      particles.push(new Particle(
        400 + Math.random() * 300,
        100 + Math.random() * 300,
        windowOpen ? 1.0 : (Math.random()-0.5)*0.2,
        windowOpen ? -0.8 : (Math.random()-0.5)*0.2,
        'rgba(170, 200, 170, 0.25)',
        12 + Math.random()*15,
        150,
        'smoke'
      ));
    }
  }

  // Decay satisfaction if things are bad
  if (neighboursAngered) {
    friendsSatisfaction = Math.max(0, friendsSatisfaction - 0.03);
  }

  // Check Game Over
  if (friendsSatisfaction <= 0 && gameState < STATES.LABYRINTH) {
    triggerGameOver("Your friends are extremely unsatisfied. They left your house.");
  }

  // 7. Update Particles
  particles.forEach(p => p.update());
  particles = particles.filter(p => p.life > 0);

  // 8. Update NPCs behaviors
  npcs.forEach(npc => {
    if (musicPlaying && npc.state !== 'dead') {
      npc.headBob = Math.sin(Date.now() * 0.015) * 4;
    }
    if (npc.state === 'panic') {
      npc.panicOffset = Math.sin(Date.now() * 0.08) * 3;
    }
  });

  // 9. Update Phase 2 Enemies AI
  if (gameState === STATES.MUSHROOM_RUN) {
    enemies.forEach(enemy => {
      if (enemy.alive) {
        // Move towards player
        const ex = player.x - enemy.x;
        const ey = player.y - enemy.y;
        const dist = Math.sqrt(ex*ex + ey*ey);
        
        if (dist > 5) {
          enemy.vx = (ex / dist) * enemy.speed;
          enemy.vy = (ey / dist) * enemy.speed;
          
          enemy.x += enemy.vx;
          if (checkWallCollisions(enemy.x, enemy.y, enemy.r)) enemy.x -= enemy.vx;
          
          enemy.y += enemy.vy;
          if (checkWallCollisions(enemy.x, enemy.y, enemy.r)) enemy.y -= enemy.vy;
        }

        // Deal damage to player on touch
        if (dist < 28) {
          player.health -= 0.5; // continuous damage on touch
          camera.shake = 5;
          
          // Bleed particles
          if (Math.random() < 0.15) {
            spawnBloodParticles(player.x, player.y, 2);
          }
          
          if (player.health <= 0) {
            triggerGameOver("The mushroom shadow entities devoured your mind.");
          }
        }
      }
    });

    // Check progress to boss arena at (600, 200)
    if (player.x > 580 && player.y < 350) {
      startBossPhase();
    }
  }

  // 10. Update Boss AI
  if (gameState === STATES.MUSHROOM_BOSS && boss) {
    const bx = player.x - boss.x;
    const by = player.y - boss.y;
    const dist = Math.sqrt(bx*bx + by*by);
    
    // Move towards player
    if (dist > 30) {
      const vx = (bx / dist) * boss.speed;
      const vy = (by / dist) * boss.speed;
      boss.x += vx;
      boss.y += vy;
    }

    // Boss kicking attack cooldown
    if (boss.kickCooldown > 0) {
      boss.kickCooldown--;
    } else {
      if (dist < 100) {
        // Kick attack!
        boss.kickCooldown = 90; // 1.5s
        audio.playSFX('boss_hit');
        camera.shake = 18;

        // Kick shockwave visual
        for(let i=0; i<16; i++) {
          const a = (i / 16) * Math.PI * 2;
          particles.push(new Particle(
            boss.x, boss.y,
            Math.cos(a)*5, Math.sin(a)*5,
            'rgba(255, 100, 0, 0.8)',
            4,
            25
          ));
        }

        if (dist < 75) {
          player.health -= 25;
          // knockback player
          player.x += (bx / dist) * -50;
          player.y += (by / dist) * -50;
          spawnBloodParticles(player.x, player.y, 8);
          
          if (player.health <= 0) {
            triggerGameOver("Beaten to death by the Giant Chaynik.");
          }
        }
      }
    }
  }

  // Update Satisfaction HUD display
  if (gameState < STATES.LABYRINTH) {
    document.getElementById('satisfaction-bar').style.width = friendsSatisfaction + '%';
  }
}

function startBossPhase() {
  spawnBoss();
}

function triggerGameOver(reason) {
  gameState = STATES.GAME_OVER;
  document.getElementById('game-over-reason').textContent = reason;
  document.getElementById('game-over-screen').classList.remove('hidden');
  audio.stopMusic();
}

// Collisions against segments
function checkWallCollisions(px, py, r) {
  for (let i = 0; i < walls.length; i++) {
    const wall = walls[i];
    
    // Distance from point to line segment
    const dx = wall.x2 - wall.x1;
    const dy = wall.y2 - wall.y1;
    const lenSq = dx * dx + dy * dy;
    
    let t = ((px - wall.x1) * dx + (py - wall.y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t)); // clamp to segment
    
    const closestX = wall.x1 + t * dx;
    const closestY = wall.y1 + t * dy;
    
    const distDx = px - closestX;
    const distDy = py - closestY;
    const dist = Math.sqrt(distDx * distDx + distDy * distDy);
    
    if (dist < r + 4) {
      return true; // collided
    }
  }
  return false;
}

// Main Render visual canvas drawing loop
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.save();
  // Camera transform matrix
  ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  ctx.rotate(camera.angle);
  ctx.translate(-CANVAS_WIDTH / 2 - camera.x, -CANVAS_HEIGHT / 2 - camera.y);

  // 1. Draw floor tiling/decorations depending on maps
  if (gameState < STATES.MUSHROOM_RUN || (gameState >= STATES.RETURN_DIZZY && gameState < STATES.LABYRINTH)) {
    drawHouseFloor();
  } else if (gameState === STATES.MUSHROOM_RUN || gameState === STATES.MUSHROOM_BOSS) {
    drawMushroomFloor();
  } else {
    drawLabyrinthFloor();
  }

  // 2. Draw walls
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#050510';
  walls.forEach(w => {
    ctx.beginPath();
    ctx.moveTo(w.x1, w.y1);
    ctx.lineTo(w.x2, w.y2);
    ctx.stroke();
    
    // Glowing neon edge lines
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = (gameState === STATES.MUSHROOM_RUN || gameState === STATES.MUSHROOM_BOSS) ? '#d946ef' : '#6366f1';
    ctx.shadowBlur = 8;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(w.x1, w.y1);
    ctx.lineTo(w.x2, w.y2);
    ctx.stroke();
    ctx.restore();
  });

  // 3. Draw Interactive Objects
  objects.forEach(obj => {
    ctx.save();
    ctx.fillStyle = obj.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = obj.color;
    
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, 8, 0, Math.PI * 2);
    ctx.fill();

    // Check interaction prompt proximity
    const dx = player.x - obj.x;
    const dy = player.y - obj.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < obj.r) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Outfit';
      ctx.textAlign = 'center';
      ctx.fillText(`[E] ${obj.name}`, obj.x, obj.y - 18);
    }
    ctx.restore();
  });

  // 4. Draw NPCs
  if (gameState < STATES.MUSHROOM_RUN || gameState >= STATES.RETURN_DIZZY) {
    npcs.forEach(npc => {
      drawFriend(npc);
    });
  }

  // 5. Draw enemies in Phase 2
  if (gameState === STATES.MUSHROOM_RUN) {
    enemies.forEach(enemy => {
      if (enemy.alive) {
        drawEnemy(enemy);
      }
    });
  }

  // 6. Draw Boss
  if (gameState === STATES.MUSHROOM_BOSS && boss) {
    drawBoss(boss);
  }

  // 7. Draw Player
  drawPlayerEntity();

  // 8. Draw Particles
  particles.forEach(p => p.draw(ctx));

  ctx.restore();

  // Draw HUD overlays (health percentage etc for combat phases)
  if (gameState === STATES.MUSHROOM_RUN || gameState === STATES.MUSHROOM_BOSS) {
    drawCombatHUD();
  }
}

// Render sub-drawings
function drawHouseFloor() {
  if (tilesetImg.complete && tilesetImg.naturalWidth !== 0) {
    // 1. Draw floors using tileset patterns
    // Bedroom: wood floorboards
    drawTiledTexture(20, 20, 280, 430, 64, 192, 32, 32);
    
    // Living room (Zal): wood floorboards
    drawTiledTexture(300, 20, 480, 430, 64, 192, 32, 32);

    // Bathroom: tiles
    drawTiledTexture(240, 450, 240, 330, 96, 384, 32, 32);

    // Kitchen: checkers
    drawTiledTexture(480, 450, 300, 330, 0, 384, 32, 32);
    
    // 2. Draw furniture using tileset images
    // Bed: (sx: 0, sy: 0, sw: 64, sh: 96) at (40, 50, 120, 160)
    ctx.drawImage(tilesetImg, 0, 0, 64, 96, 40, 50, 120, 160);
    // Wardrobe: (sx: 96, sy: 288, sw: 48, sh: 64) at (220, 40, 60, 110)
    ctx.drawImage(tilesetImg, 96, 288, 48, 64, 220, 40, 60, 110);
    // Couch: (sx: 432, sy: 208, sw: 96, sh: 48) at (480, 190, 160, 60)
    ctx.drawImage(tilesetImg, 432, 208, 96, 48, 480, 190, 160, 60);
    // Table: (sx: 384, sy: 144, sw: 64, sh: 48) at (510, 120, 100, 50)
    ctx.drawImage(tilesetImg, 384, 144, 64, 48, 510, 120, 100, 50);
    // TV: (sx: 288, sy: 144, sw: 48, sh: 48) at (520, 30, 80, 10)
    ctx.drawImage(tilesetImg, 288, 144, 48, 48, 520, 15, 80, 30);
    // Toilet sink: (sx: 32, sy: 432, sw: 32, sh: 48) at (340, 750, 40, 20)
    ctx.drawImage(tilesetImg, 32, 432, 32, 48, 260, 470, 40, 40);
    // Toilet: (sx: 0, sy: 432, sw: 32, sh: 48) at (340, 750, 40, 20)
    ctx.drawImage(tilesetImg, 0, 432, 32, 48, 340, 720, 40, 50);
    // Fridge: (sx: 192, sy: 48, sw: 32, sh: 64) at (720, 690, 50, 50)
    ctx.drawImage(tilesetImg, 192, 48, 32, 64, 720, 690, 50, 75);
    // Stove: (sx: 224, sy: 48, sw: 32, sh: 64) at (660, 700, 50, 50)
    ctx.drawImage(tilesetImg, 224, 48, 32, 64, 660, 690, 50, 75);
  } else {
    // Fallback if tileset hasn't loaded (original procedural render)
    drawHouseFloorFallback();
  }
}

// Helper to tile a texture slice
function drawTiledTexture(dx, dy, dw, dh, sx, sy, sw, sh) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(dx, dy, dw, dh);
  ctx.clip();
  for (let x = dx; x < dx + dw; x += sw) {
    for (let y = dy; y < dy + dh; y += sh) {
      ctx.drawImage(tilesetImg, sx, sy, sw, sh, x, y, sw, sh);
    }
  }
  ctx.restore();
}

function drawHouseFloorFallback() {
  // Draw Room tiles / floorboards
  // Bedroom: parquet
  ctx.fillStyle = '#2d1b10'; // dark brown wood
  ctx.fillRect(20, 20, 280, 430);
  
  // Living room (Zal): floorboard lines
  ctx.fillStyle = '#3f2516';
  ctx.fillRect(300, 20, 480, 430);
  ctx.strokeStyle = '#1e0f07';
  ctx.lineWidth = 1;
  for(let x=340; x<780; x+=40) {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 450); ctx.stroke();
  }

  // Bathroom: tiling pattern
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(240, 450, 240, 330);
  ctx.strokeStyle = '#334155';
  for(let x=240; x<480; x+=30) {
    ctx.beginPath(); ctx.moveTo(x, 450); ctx.lineTo(x, 780); ctx.stroke();
  }
  for(let y=450; y<780; y+=30) {
    ctx.beginPath(); ctx.moveTo(240, y); ctx.lineTo(480, y); ctx.stroke();
  }

  // Kitchen: checkers
  ctx.fillStyle = '#020617';
  ctx.fillRect(480, 450, 300, 330);
  for(let x=480; x<780; x+=40) {
    for(let y=450; y<780; y+=40) {
      if ((Math.floor(x/40) + Math.floor(y/40)) % 2 === 0) {
        ctx.fillStyle = '#1e1b4b'; // alternate checkers
        ctx.fillRect(x, y, 40, 40);
      }
    }
  }

  // Draw Furniture Shapes
  // Bed
  ctx.fillStyle = '#475569';
  ctx.fillRect(40, 50, 120, 160);
  // Wardrobe
  ctx.fillStyle = '#78350f';
  ctx.fillRect(220, 40, 60, 110);
  // Couch in Zal
  ctx.fillStyle = '#4c1d95';
  ctx.fillRect(480, 190, 160, 60);
  // Table
  ctx.fillStyle = '#5b21b6';
  ctx.fillRect(510, 120, 100, 50);
  // TV
  ctx.fillStyle = '#000000';
  ctx.fillRect(520, 30, 80, 10);
  // Toilet sink
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(340, 750, 40, 20);
  // Fridge
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(720, 690, 50, 50);
}

function drawMushroomFloor() {
  ctx.fillStyle = '#090514';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // draw neon grid patterns
  ctx.strokeStyle = '#4a044e';
  ctx.lineWidth = 1;
  for(let x=0; x<CANVAS_WIDTH; x+=40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke();
  }
  for(let y=0; y<CANVAS_HEIGHT; y+=40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke();
  }
}

function drawLabyrinthFloor() {
  ctx.fillStyle = '#05020c';
  ctx.fillRect(100, 100, 600, 600);
  
  ctx.strokeStyle = '#311042';
  ctx.lineWidth = 2;
  for(let x=100; x<700; x+=50) {
    ctx.beginPath(); ctx.moveTo(x, 100); ctx.lineTo(x, 700); ctx.stroke();
  }
  for(let y=100; y<700; y+=50) {
    ctx.beginPath(); ctx.moveTo(100, y); ctx.lineTo(700, y); ctx.stroke();
  }
}

function drawFriend(npc) {
  if (npc.state === 'dead') {
    // Draw flat body with blood pool underneath
    ctx.save();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.fillRect(npc.x - 22, npc.y - 22, 44, 44); // Blocky blood pool
    
    ctx.fillStyle = npc.color;
    ctx.fillRect(npc.x - 14, npc.y - 14, 28, 28); // Blocky body
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.translate(npc.x, npc.y + (npc.panicOffset || 0));
  
  // Head Bob
  ctx.translate(0, npc.headBob || 0);

  // Body - Clunky square
  ctx.fillStyle = npc.color;
  ctx.fillRect(-15, -15, 30, 30);

  // Hands / Shoulders bob - Clunky squares
  ctx.fillStyle = '#0a0a14';
  ctx.fillRect(-18, 5, 8, 8);
  ctx.fillRect(10, 5, 8, 8);

  // Clunky Head
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-8, -8, 16, 16);

  // Glasses / hair details - Clunky
  ctx.fillStyle = '#ffffff';
  if (npc.id === 'vahe') {
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-9, -12, 18, 6); // Blocky hair
  } else if (npc.id === 'karen') {
    ctx.fillStyle = '#10b981';
    ctx.fillRect(-10, -10, 20, 5); // Blocky cap
  } else if (npc.id === 'grish') {
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(-6, -10, 12, 4); // Blocky hair
  }
  
  ctx.restore();
}

function drawEnemy(enemy) {
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  
  // Eerie neon shadow aura - Clunky
  ctx.fillStyle = 'rgba(189, 0, 255, 0.25)';
  ctx.fillRect(-22, -22, 44, 44);

  // Face circle -> Face square
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(-enemy.r, -enemy.r, enemy.r*2, enemy.r*2);

  // Glowing eyes - Square
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-6, -5, 4, 4);
  ctx.fillRect(2, -5, 4, 4);
  
  // Label character likeness
  ctx.fillStyle = '#c084fc';
  ctx.font = '8px Outfit';
  ctx.textAlign = 'center';
  ctx.fillText(enemy.face.toUpperCase(), 0, 24);

  ctx.restore();
}

function drawBoss(boss) {
  ctx.save();
  ctx.translate(boss.x, boss.y);

  // Pulsing square glow
  const pulse = Math.sin(Date.now() * 0.01) * 8;
  ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
  ctx.fillRect(-boss.r - 10 - pulse, -boss.r - 10 - pulse, (boss.r + 10 + pulse)*2, (boss.r + 10 + pulse)*2);

  // Giant clunky blocky kettle body
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 4;
  ctx.fillRect(-boss.r, -boss.r, boss.r*2, boss.r*2);
  ctx.strokeRect(-boss.r, -boss.r, boss.r*2, boss.r*2);

  // Spout and handle - Clunky rects
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-boss.r - 15, -10, 15, 20); // Handle
  ctx.fillRect(boss.r, -8, 25, 12); // Spout
  
  // Glowing steam emitting from spout
  if (Math.random() < 0.3) {
    particles.push(new Particle(
      boss.x + boss.r + 20, boss.y,
      3, (Math.random()-0.5)*1,
      'rgba(244, 63, 94, 0.5)',
      6,
      20
    ));
  }

  // Boss name label
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 12px Outfit';
  ctx.textAlign = 'center';
  ctx.fillText("GIANT CHAYNIK BOSS", 0, boss.r + 22);

  // Health indicator
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-35, -boss.r - 18, 70, 8);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-35, -boss.r - 18, 70 * (boss.health / boss.maxHealth), 8);

  ctx.restore();
}

function drawPlayerEntity() {
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(player.angle);

  // Hands bob walking animation
  const walkBob = (keys['w'] || keys['a'] || keys['s'] || keys['d']) ? Math.sin(Date.now() * 0.02) * 5 : 0;

  // Draw hands holding weapon/item - Clunky squares
  ctx.fillStyle = '#0f172a';
  
  if (player.hasChaynik) {
    ctx.fillRect(10, -12 + walkBob, 6, 6); // Left hand
    ctx.fillRect(12, 8 - walkBob, 6, 6); // Right hand holds kettle
    
    // Draw chaynik weapon sprite
    ctx.fillStyle = '#cbd5e1';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillRect(10, 5 - walkBob, 14, 10); // kettle barrel
  } else if (player.hasCoffee) {
    ctx.fillRect(10, -12 + walkBob, 6, 6);
    ctx.fillRect(12, 8 - walkBob, 6, 6);
    
    // Draw coffee mug
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(14, 5 - walkBob, 8, 8);
  } else if (player.hasWater) {
    ctx.fillRect(10, -12 + walkBob, 6, 6);
    ctx.fillRect(12, 8 - walkBob, 6, 6);
    
    // Draw glass
    ctx.fillStyle = '#06b6d4';
    ctx.fillRect(14, 5 - walkBob, 7, 9);
  } else if (player.hasSnacks) {
    ctx.fillRect(10, -12 + walkBob, 6, 6);
    ctx.fillRect(12, 8 - walkBob, 6, 6);
    
    // Draw snack chips bag
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(13, 4 - walkBob, 8, 10);
  } else {
    ctx.fillRect(10, -12 + walkBob, 6, 6); // standard left hand
    ctx.fillRect(10, 8 - walkBob, 6, 6); // standard right hand
  }

  // Body - Clunky square
  ctx.fillStyle = player.color;
  ctx.shadowBlur = 8;
  ctx.shadowColor = player.color;
  ctx.fillRect(-15, -15, 30, 30);
  ctx.shadowBlur = 0; // reset

  // Clunky Head
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-7, -7, 14, 14);

  // Nose / front indicator
  ctx.fillStyle = '#cbd5e1';
  ctx.fillRect(12, -2, 5, 4);

  ctx.restore();
}

function drawCombatHUD() {
  // Draw mind/health bar for boss levels
  ctx.save();
  ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
  ctx.fillRect(20, CANVAS_HEIGHT - 45, 250, 25);
  ctx.strokeStyle = '#f43f5e';
  ctx.strokeRect(20, CANVAS_HEIGHT - 45, 250, 25);
  
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(22, CANVAS_HEIGHT - 43, 246 * (player.health / 100), 21);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '11px Outfit';
  ctx.fillText("MIND INTEGRITY (HP)", 30, CANVAS_HEIGHT - 28);
  ctx.restore();
}

// Main game loop manager
function loop(time) {
  // Delta timing
  let dt = (time - lastTime) / 1000;
  if (dt > 0.1) dt = 0.1;
  lastTime = time;

  if (gameState !== STATES.GAME_OVER && gameState !== STATES.GAME_COMPLETE) {
    update(dt);
  }
  draw();

  // Psychedelic color filters based on highness
  if (player.highness > 0.05) {
    const rot = Math.floor(player.highness * 180 * Math.sin(Date.now()*0.001));
    canvas.style.filter = `hue-rotate(${rot}deg) contrast(1.1) saturate(1.3)`;
  } else if (player.dizziness > 0.05) {
    canvas.style.filter = `blur(1px) contrast(0.9)`;
  } else {
    canvas.style.filter = 'none';
  }

  requestAnimationFrame(loop);
}

// Mount and initialize Canvas sizing
window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  
  initGame();
  requestAnimationFrame(loop);
});
