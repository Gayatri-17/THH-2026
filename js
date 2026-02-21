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

let offenderType = (planning === "Planned") ? "Organized Offender" : "Disorganized Offender";

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

document.getElementById("results").style.display = "block";
document.getElementById("primaryMotive").innerHTML = "<strong>Primary Motivation:</strong> " + primary;
document.getElementById("offenderType").innerHTML = "<strong>Offender Type:</strong> " + offenderType;
document.getElementById("riskLevel").innerHTML = "<strong>Risk Level:</strong> " + riskText;

let meter = document.getElementById("riskMeter");
meter.style.width = riskScore + "%";
meter.style.background = riskColor;

document.getElementById("summary").innerText =
"The behavioral indicators suggest a primary motivation of " + primary +
". The offender demonstrates characteristics of an " + offenderType +
". Risk assessment indicates a " + riskText +
" probability of repeated or escalating behavior.";

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
