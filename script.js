let chartInstance;

function analyzeCrime() {

let crimeType = document.getElementById("crimeType").value;
let relationship = document.getElementById("relationship").value;
let planning = document.getElementById("planning").value;
let repeat = document.getElementById("repeat").value;
let trigger = document.getElementById("trigger").value;

let greed = 0;
let revenge = 0;
let power = 0;
let impulse = 0;

if(crimeType === "Theft" || trigger === "Financial Stress") greed += 3;
if(trigger === "Revenge" || relationship === "Partner") revenge += 3;
if(planning === "Planned" && repeat === "Repeated") power += 3;
if(planning === "Impulsive") impulse += 3;

if(crimeType === "Assault" && trigger === "Jealousy") revenge += 2;
if(crimeType === "Fraud") greed += 2;
if(crimeType === "Homicide") power += 2;

let total = greed + revenge + power + impulse;
if(total === 0) total = 1; 

let confidence = "Low";
if(total >= 5) confidence = "Moderate";
if(total >= 8) confidence = "High";

let greedP = Math.round((greed/total)*100);
let revengeP = Math.round((revenge/total)*100);
let powerP = Math.round((power/total)*100);
let impulseP = Math.round((impulse/total)*100);

let motives = {
    "Greed": greedP,
    "Revenge": revengeP,
    "Power/Control": powerP,
    "Impulsive Rage": impulseP
};

let primary = Object.keys(motives).reduce((a,b)=> motives[a] > motives[b] ? a : b);

// ---------- Motive Blend Detection ----------
let motiveValues = Object.entries(motives).sort((a,b)=> b[1]-a[1]);
let blendText = "Single dominant motive";

if(Math.abs(motiveValues[0][1] - motiveValues[1][1]) <= 10){
    blendText = "Dual Motivation Detected: " + motiveValues[0][0] + " + " + motiveValues[1][0];
}

let offenderType = (planning === "Planned") ? "Organized Offender" : "Disorganized Offender";

// ---------- Behavioral Stability ----------
let stability = "Stable";

if(planning === "Impulsive" && repeat === "Repeated"){
    stability = "Escalating Behavior Pattern";
}
else if(planning === "Impulsive"){
    stability = "Volatile Behavior Pattern";
}

let riskScore = 0;
if(repeat === "Repeated") riskScore += 50;
if(planning === "Planned") riskScore += 30;
if(crimeType === "Homicide") riskScore += 20;

let riskText = "Low";
let riskColor = "green";

if(riskScore > 40 && riskScore <= 70) {
    riskText = "Medium";
    riskColor = "orange";
}
if(riskScore > 70) {
    riskText = "High";
    riskColor = "red";
}

// ---------- Investigative Priority ----------
let priority = "Monitor";

if(riskScore > 70){
    priority = "Immediate Attention Required";
}
else if(riskScore > 40){
    priority = "Active Monitoring Recommended";
} 

document.getElementById("results").style.display = "block";
document.getElementById("primaryMotive").innerHTML = "<strong>Primary Motivation:</strong> " + primary;
document.getElementById("offenderType").innerHTML = "<strong>Offender Type:</strong> " + offenderType;
document.getElementById("riskLevel").innerHTML = "<strong>Risk Level:</strong> " + riskText;
document.getElementById("confidenceLevel").innerHTML = "<strong>Analysis Confidence:</strong> " + confidence;
let meter = document.getElementById("riskMeter");
meter.style.width = riskScore + "%";
meter.style.background = riskColor;

document.getElementById("summary").innerText =
"The behavioral indicators suggest a primary motivation of " + primary +
". The offender demonstrates characteristics of an " + offenderType +
". Risk assessment indicates a " + riskText +
" probability of repeated or escalating behavior.";

// ---------- Evolution Prediction ----------
let evolution = "Behavior unlikely to escalate significantly";

if(repeat === "Repeated" && planning === "Planned"){
    evolution = "Likely progression toward strategic escalation";
}
else if(planning === "Impulsive"){
    evolution = "Unpredictable recurrence likely";
}

// ---------- Display ----------
document.getElementById("stabilityTag").innerHTML =
"<strong>Behavioral Stability:</strong> " + stability;

document.getElementById("evolutionPrediction").innerHTML =
"<strong>Evolution Prediction:</strong> " + evolution;

document.getElementById("priorityLevel").innerHTML =
"<strong>Investigative Priority:</strong> " + priority;

document.getElementById("motiveBlend").innerHTML =
"<strong>Motive Pattern:</strong> " + blendText;

let severity = document.getElementById("repeat").value;
let generatedProfile = document.getElementById("summary").innerText;
saveCase(crimeType, severity, relationship, planning, trigger, generatedProfile, priority);
loadCases();

if(chartInstance) chartInstance.destroy();

let ctx = document.getElementById("motiveChart").getContext("2d");

chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Greed", "Revenge", "Power/Control", "Impulsive Rage"],
        datasets: [{
            data: [greedP, revengeP, powerP, impulseP],
            backgroundColor: ["#3b82f6","#ef4444","#f59e0b","#22c55e"]
        }]
    }
});
}

function runBehaviorAnalysis() {

    let crime = document.getElementById("crimeCategory").value;
    let emotion = document.getElementById("emotionalState").value;
    let planning = document.getElementById("planningDepth").value;

    if (!crime || !emotion || !planning) {
        alert("Please complete all fields.");
        return;
    }

    let motive = "";
    let offender = "";
    let risk = "";

    if (crime === "violent" && emotion === "angry") {
        motive = "Impulsive Aggression";
        offender = "Disorganized Reactive Offender";
        risk = "High Escalation Risk";
    }
    else if (crime === "financial" && planning === "premeditated") {
        motive = "Strategic Financial Gain";
        offender = "Organized Calculative Offender";
        risk = "Moderate Risk";
    }
    else if (crime === "domestic") {
        motive = "Emotional Conflict Escalation";
        offender = "Emotionally Driven Individual";
        risk = "High Risk of Repetition";
    }
    else if (crime === "cyber") {
        motive = "Opportunistic Exploitation";
        offender = "Technically Skilled Manipulator";
        risk = "Low Physical Risk";
    }
    else {
        motive = "Contextual / Mixed Motivation";
        offender = "Situational Offender";
        risk = "Moderate Risk";
    }

    document.getElementById("behaviorOutput").style.display = "block";
    document.getElementById("behaviorOutput").innerHTML =
        "<h3>Behavioral Analysis Report</h3>" +
        "<p><strong>Primary Motive:</strong> " + motive + "</p>" +
        "<p><strong>Offender Type:</strong> " + offender + "</p>" +
        "<p><strong>Risk Assessment:</strong> " + risk + "</p>" +
        "<hr><p>Generated using structured behavioral profiling logic.</p>";
}

function clearBehaviorInputs() {
    document.getElementById("crimeCategory").value = "";
    document.getElementById("emotionalState").value = "";
    document.getElementById("planningDepth").value = "";
    document.getElementById("behaviorOutput").style.display = "none";
}

function toggleProfileInfo() {
    let box = document.getElementById("profileInfoBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
} 

function saveCase(crimeType, severity, relationship, planning, trigger, result, priority) {
    let caseData = {
        caseId: "ML-" + Date.now(),
        crimeType,
        severity,
        relationship,
        planning,
        trigger,
        result,
        priority,
        time: new Date().toLocaleString()
    };

    let history = JSON.parse(localStorage.getItem("cases")) || [];
    history.push(caseData);

    localStorage.setItem("cases", JSON.stringify(history));
} 

function loadCases() {
    let history = JSON.parse(localStorage.getItem("cases")) || [];
    let log = document.getElementById("caseLog");

    log.innerHTML = "";

    history.reverse().forEach(caseItem => {
        log.innerHTML += `
        <div style="border:1px solid #ccc; padding:10px; margin:10px;">
            <b>Case ID:</b> ${caseItem.caseId} <br>
            <b>Crime:</b> ${caseItem.crimeType} <br>
            <b>Repetition:</b> ${caseItem.severity} <br>
            <b>Relationship:</b> ${caseItem.relationship} <br>
            <b>Planning Level:</b> ${caseItem.planning} <br>
            <b>Trigger:</b> ${caseItem.trigger} <br>
            <b>Investigative Priority:</b> ${caseItem.priority || "Monitor"} <br>
            <b>Behavioral Summary:</b> ${caseItem.result} <br>
            <small>${caseItem.time}</small>
        </div>
        `;
    });
}
window.onload = loadCases;
