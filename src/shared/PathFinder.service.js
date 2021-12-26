
export default class PathFinderService {
    findDirectPath(start, destination) {
        let travelPath = [];
        let xOffset = destination.x - start.x > 0 ? 1 : -1;
        let yOffset = destination.y - start.y > 0 ? 1 : -1;  
        travelPath.push({ x: start.x, y: start.y });
  
        if (destination.x !== start.x) {
          for (let i = (start.x + xOffset); i !== destination.x; i += xOffset) {
            travelPath.push({ x: i, y: start.y });
          }
    
          travelPath.push({ x: destination.x, y: start.y });
        }
  
        if (destination.y !== start.y) {
          for (let j = (start.y + yOffset); j !== destination.y; j += yOffset) {
            travelPath.push({ x: destination.x, y: j });
          }
    
          travelPath.push({ x: destination.x, y: destination.y });
        }

        return travelPath;
    }
}