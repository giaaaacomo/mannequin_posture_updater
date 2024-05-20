const A = {
    version: 7,
    data: [
        [0, 3.8, 0], // model.body.position
        [0, -90, 0], // model.body.posture
        [0, 0, -60], // model.torso.posture
        [0, 0, 24.9], // model.head.posture
        [6, 0, 0], // model.l_leg.posture
        [0], // model.l_knee.posture
        [-6, -6, -0.6], // model.l_ankle.posture
        [-6, 0, 0], // model.r_leg.posture
        [0], // model.r_knee.posture
        [6, 6, -0.6], // model.r_ankle.posture
        [7, -0.6, -5], // model.l_arm.posture
        [15], // model.l_elbow.posture
        [5, 0, 0], // model.l_wrist.posture
        [-90, 70, 75, 0, 10, 0, 10], // model.l_finger_0.posture
        [0, 0, 10, 0, 10, 0, 10], // model.l_finger_1.posture
        [0, 0, 10, 0, 10, 0, 10], // model.l_finger_2.posture
        [0, 0, 10, 0, 10, 0, 10], // model.l_finger_3.posture
        [0, 0, 10, 0, 10, 0, 10], // model.l_finger_4.posture
        [-7, 0.6, -5], // model.r_arm.posture
        [15], // model.r_elbow.posture
        [-5, 0, 0], // model.r_wrist.posture
        [90, -70, 75, 0, 10, 0, 10], // model.r_finger_0.posture
        [0, 0, 10, 0, 10, 0, 10], // model.r_finger_1.posture
        [0, 0, 10, 0, 10, 0, 10], // model.r_finger_2.posture
        [0, 0, 10, 0, 10, 0, 10], // model.r_finger_3.posture
        [0, 0, 10, 0, 10, 0, 10] // model.r_finger_4.posture
    ]
};

function updatePostures(A, B) {
    B.version = A.version;

    const l_fingers_index = [13, 14, 15, 16, 17];
    const r_fingers_index = [18, 19, 20, 21, 22];
    
    const l_fingers = A.data.slice(13, 18);
    const r_fingers = A.data.slice(18, 23);

    B.data = B.data.filter((posture, i) => !l_fingers_index.includes(i) && !r_fingers_index.includes(i));
    
    B.data.splice(13, 0, ...l_fingers);
    B.data.splice(18, 0, ...r_fingers);
    
    for (let i = B.data.length; i < A.data.length; i++) {
        B.data.push(A.data[i]);
    }

    B.data = B.data.slice(0, A.data.length);
    
    return B;
}

document.getElementById('convertButton').addEventListener('click', function() {
    const bData = document.getElementById('b_data').value;
    const siteType = document.getElementById('busy').value;
    const splitVar = "],";

    if(siteType === "setpose")
    {
        if(bData !== "")
        {
            var bDataSplit = bData.split(splitVar);
            bDataSplit.pop();
            bDataSplit[0] = bDataSplit[0].replace("6", "7");
            bDataSplit[13] = "[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10";
            bDataSplit[17] = "[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]";
            //console.log(bDataSplit);

            var res = bDataSplit.join(splitVar);

            document.getElementById('b_converted').value = res + "]}";
            
        }
    }

    if(siteType === "other")
    {
        alert("coming feature!!");
    }

});
