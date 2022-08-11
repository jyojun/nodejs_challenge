export function check_camp_id(id) {
  // 문자열 길이 4가 아니거나
  if (id.length !== 4) {
    return false;
  }

  // 앞글자가 J나 j가 아니거나
  if (id[0] !== "J") {
    return false;
  }

  // 번호가 1~384가 아니거나
  let temp = parseInt(id.slice(1));
  if (temp <= 0 || temp > 384) {
    return false;
  }
  return true;
}

export function insertGroup(groups, client) {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].length < 4) {
      groups[i].push(client);
      client.groupNum = i; // 그룹 index
      break;
    } else {
      if (i == groups.length - 1) {
        let temp = [client];
        client.groupNum = i + 1;
        groups.push(temp);
        break;
      }
    }
  }
}

export function popGroup(groups, client) {
  let groupNum = client.groupNum;
  for (let i = 0; i < groups[groupNum].length; i++) {
    if (groups[groupNum][i] === client) {
      groups[groupNum].splice(i, 1);
      break;
    }
  }
}
