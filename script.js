var nooftasks = 0;
document.addEventListener("DOMContentLoaded", () => {

    /// writing the tasks
    const taskContainer = document.getElementById("task-container");
    for (var i = 1; i <= localStorage.getItem('nooftasks'); i++) {
        var sk = document.createElement("div");
        sk.classList.add("task");
        sk.innerHTML = `
            <div class="checkbox">
                <input type="checkbox" class="checkk" id="checkcheck-${i}">
                <input autocomplete="off" type="hidden" name="nooftasks" value="${i}">
            </div>
            <div class="text">
                <input type="text" maxlength="60" name="" id="${i}" value="${localStorage.getItem(i)}">
            </div>
        `;

        if (taskContainer.contains(document.getElementById("notasks"))){
            taskContainer.removeChild(document.getElementById("notasks"));
        }
        
        taskContainer.prepend(sk);
        const inputtext = document.getElementById(`${i}`);
        inputtext.addEventListener('change', () => {
            localStorage.setItem(`${inputtext.id}`, inputtext.value);
        });
    }
    
    /// check and finish
    const checkboxes = document.querySelectorAll(".checkk");


    checkboxes.forEach(chk => {
        const savedState = localStorage.getItem(chk.id);

        if (savedState !== null) {
            chk.checked = savedState === 'true';
        }

        if (chk.checked){
            var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
            gettext.style.textDecoration = "line-through";
            gettext.disabled = true;
            gettext.style.opacity = "0.5";
        }  else {
            var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
            gettext.style.textDecoration = "";
            gettext.style.opacity = "1.0";
            gettext.disabled = false;
        }

        chk.addEventListener("change", function () {
            localStorage.setItem(chk.id, chk.checked);
            if (this.checked){
                var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
                gettext.style.textDecoration = "line-through";
                gettext.disabled = true;
                gettext.style.opacity = "0.5";
            }  else {
                var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
                gettext.style.textDecoration = "";
                gettext.style.opacity = "1.0";
                gettext.disabled = false;
            }
        });
    });

    
    
    /// adding a new task
    const addTaskBtn = document.getElementById("addtask");
    

    addTaskBtn.addEventListener("click", () => {
        if (nooftasks === 20) {
            addTaskBtn.disabled = true;
            addTaskBtn.style.opacity = .5;
            // addTaskBtn.style.transform = "none";
            // addTaskBtn.style.boxShadow = "none";
            // addTaskBtn.style.cursor = "default";
            addTaskBtn.style.pointerEvents = "none";
            return;
        }
        nooftasks = JSON.parse(localStorage.getItem('nooftasks')) + 1;
        localStorage.setItem('nooftasks', nooftasks);
        const newTask = document.createElement("div");
        newTask.classList.add("task");
        newTask.innerHTML = `
            <div class="checkbox">
                <input type="checkbox" id="checkcheck-${nooftasks}" class="checkk">
                <input autocomplete="off" type="hidden" name="nooftasks" value="${nooftasks}">
            </div>
            <div class="text">
                <input type="text" maxlength="60" name="" id="${nooftasks}">
            </div>
        `;
        
        
        if (taskContainer.contains(document.getElementById("notasks"))){
            taskContainer.removeChild(document.getElementById("notasks"));
        }
        
        taskContainer.prepend(newTask);
        const inputtext = document.getElementById(`${nooftasks}`);
        localStorage.setItem(`${inputtext.id}`, inputtext.value);
        
        inputtext.addEventListener('change', () => {
            localStorage.setItem(`${inputtext.id}`, inputtext.value);
        });

        /// check and finish
        const checkboxes = document.querySelectorAll(".checkk");

        checkboxes.forEach(chk => {
        const savedState = localStorage.getItem(chk.id);

        if (savedState !== null) {
            chk.checked = savedState === 'true';
        }

        if (chk.checked){
            var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
            gettext.style.textDecoration = "line-through";
            gettext.disabled = true;
            gettext.style.opacity = "0.5";
        }  else {
            var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
            gettext.style.textDecoration = "";
            gettext.style.opacity = "1.0";
            gettext.disabled = false;
        }

        chk.addEventListener("change", function () {
            localStorage.setItem(chk.id, chk.checked);
            if (this.checked){
                var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
                gettext.style.textDecoration = "line-through";
                gettext.disabled = true;
                gettext.style.opacity = "0.5";
            }  else {
                var gettext = document.getElementById(chk.id.replace("checkcheck-", ""));
                gettext.style.textDecoration = "";
                gettext.style.opacity = "1.0";
                gettext.disabled = false;
            }
        });
    });

    });

    

    /// clear the tasks
    const clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", () => {
        taskContainer.innerHTML = '<p id="notasks">No tasks to show</p>';
        nooftasks = 0;
        localStorage.setItem('nooftasks', 0);
        var notenote = localStorage.getItem("note");
        localStorage.clear();
        localStorage.setItem("note", notenote);
        location.reload();
    });

    

    /// pomodoro timer

    const starter = document.getElementById("start");
    starter.addEventListener("click", () => {
        if(starter.value == "Start") {
            starter.value = "Pause";
            document.getElementById("minute").readOnly = true;
            document.getElementById("second").readOnly = true;
            var count = parseInt(document.getElementById("second").value);
            intervalid = setInterval(() => {
                    if (parseInt(document.getElementById("second").value) == 0) {
                        
                        if (parseInt(document.getElementById("minute").value) == 0) {
                            alert("Time's up!");
                            window.location.reload();
                        }

                        document.getElementById("second").value = 60;
                        document.getElementById("minute").value = parseInt(document.getElementById("minute").value) - 1;
                    }

                    document.getElementById("second").value = parseInt(document.getElementById("second").value) - 1;
            }, 1000);
        } else if(starter.value == "Pause") 
        {
            clearInterval(intervalid);
            starter.value = "Start";
        }
        
    });

    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
        window.location.reload();
    });

    const note = document.getElementById("note");
    var yay = localStorage.getItem("note");
    if (yay == "null") note.value = "";
    else note.value = yay;
    note.addEventListener("change", () => {
        localStorage.setItem("note", note.value);
    });


    /// quotes

    const quotes = [
        "It takes courage to grow up and become who you really are.\" — E.E. Cummings",
        "Your self-worth is determined by you. You don't have to depend on someone telling you who you are.\" — Beyoncé",
        "Nothing is impossible. The word itself says 'I'm possible!'.\" — Audrey Hepburn",
        "Keep your face always toward the sunshine, and shadows will fall behind you.\" — Walt Whitman",
        "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And you are the guy who'll decide where to go.\" — Dr. Seuss",
        "Attitude is a little thing that makes a big difference.\" — Winston Churchill",
        "To bring about change, you must not be afraid to take the first step. We will fail when we fail to try.\" — Rosa Parks",
        "All our dreams can come true, if we have the courage to pursue them.\" — Walt Disney",
        "Don't sit down and wait for the opportunities to come. Get up and make them.\" — Madam C.J. Walker",
        "Champions keep playing until they get it right.\" — Billie Jean King",
        "I am lucky that whatever fear I have inside me, my desire to win is always stronger.\" — Serena Williams",
        "You are never too old to set another goal or to dream a new dream.\" — C.S. Lewis",
        "It is during our darkest moments that we must focus to see the light.\" — Aristotle",
        "Believe you can and you're halfway there.\" — Theodore Roosevelt",
        "Life shrinks or expands in proportion to one's courage.\" — Anaïs Nin",
        "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.\" — Ella Fitzgerald",
        "Try to be a rainbow in someone's cloud.\" — Maya Angelou",
        "If you don't like the road you're walking, start paving another one.\" — Dolly Parton",
        "Real change, enduring change, happens one step at a time.\" — Ruth Bader Ginsburg",
        "All dreams are within reach. All you have to do is keep moving towards them.\" — Viola Davis",
        "It is never too late to be what you might have been.\" — George Eliot",
        "When you put love out in the world it travels, and it can touch people and reach people in ways that we never even expected.\" — Laverne Cox",
        "Give light and people will find the way.\" — Ella Baker",
        "It always seems impossible until it's done.\" — Nelson Mandela",
        "Don't count the days, make the days count.\" — Muhammad Ali",
        "If you risk nothing, then you risk everything.\" — Geena Davis",
        "Definitions belong to the definers, not the defined.\" — Toni Morrison",
        "When you have a dream, you've got to grab it and never let go.\" — Carol Burnett",
        "Never allow a person to tell you no who doesn't have the power to say yes.\" — Eleanor Roosevelt",
        "When it comes to luck, you make your own.\" — Bruce Springsteen",
        "If you're having fun, that's when the best memories are built.\" — Simone Biles",
        "Failure is the condiment that gives success its flavor.\" — Truman Capote",
        "Hard things will happen to us. We will recover. We will learn from it. We will grow more resilient because of it.\" — Taylor Swift",
        "Your story is what you have, what you will always have. It is something to own.\" — Michelle Obama",
        "To live is the rarest thing in the world. Most people just exist.\" — Oscar Wilde",
        "You define beauty yourself, society doesn't define your beauty.\" — Lady Gaga",
        "Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.\" — Mary Lou Retton",
        "You just gotta keep going and fighting for everything, and one day you'll get to where you want.\" — Naomi Osaka",
        "If you prioritize yourself, you are going to save yourself.\" — Gabrielle Union",
        "No matter how far away from yourself you may have strayed, there is always a path back. You already know who you are and how to fulfill your destiny.\" — Oprah Winfrey",
        "A problem is a chance for you to do your best.\" — Duke Ellington",
        "You can't turn back the clock. But you can wind it up again.\" — Bonnie Prudden",
        "When you can’t find someone to follow, you have to find a way to lead by example.\" — Roxane Gay",
        "There is no better compass than compassion.\" — Amanda Gorman",
        "Stand before the people you fear and speak your mind – even if your voice shakes.\" — Maggie Kuhn",
        "It’s a toxic desire to try to be perfect. I realized later in life that the challenge is not to be perfect. It’s to be whole.\" — Jane Fonda",
        "Vitality shows not only in the ability to persist but in the ability to start over.\" — F. Scott Fitzgerald",
        "The most common way people give up their power is by thinking they don’t have any.\" — Alice Walker",
        "Love yourself first and everything else falls into line.\" — Lucille Ball",
        "In three words I can sum up everything I've learned about life: It goes on.\" — Robert Frost"
    ]

    const randomInt = Math.floor(Math.random() * 50);
    document.getElementById("thethequote").innerHTML = quotes[randomInt];
});