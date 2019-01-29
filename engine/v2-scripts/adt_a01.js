function convert(engine, object, api) {

  // first step: process the patient
  var pid = msg.segment[2];
  var patid = pid.field[3].element[1].text;
  // patid = pid.q('field[3].element.where(component[5] = "MR").text');
  var pat = api.read('Patient', patid);
  if (pat == null)
    pat = makePatient(engine, pid, api, patid);
  else
    updatePatient(pat, pid, api);

  // now: process the encounter
}

function makePatient(engine, pid, api, patid) {
  var pat = engine.liquid("pid.liquid", pid, "Patient", "json");
  pat.id = patid;
  return api.update(pat);
}

function updatePatient(pat, pid, api) {
  // todo
}

