import type { Shift } from '../data/roster';
import { parseLocal, type LocalDate } from './time';

export const MIN_CARD_PX = 18;

export interface PositionedShift {
  shift: Shift;
  startMin: number;
  endMin: number;
  top: number;
  height: number;
  lane: number;
  lanes: number;
}

/**
 * Positions the shifts that belong to `date` inside a day column.
 * Overlapping shifts are packed into side-by-side lanes; every shift in an
 * overlap cluster shares the cluster's lane count so widths line up.
 */
export function layoutDay(shifts: Shift[], date: LocalDate, hourHeight: number): PositionedShift[] {
  const items = shifts
    .filter((s) => parseLocal(s.start).date === date)
    .map((shift) => ({
      shift,
      startMin: parseLocal(shift.start).minutes,
      endMin: parseLocal(shift.end).minutes,
    }))
    .sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);

  const out: PositionedShift[] = [];
  let cluster: PositionedShift[] = [];
  let laneEnds: number[] = [];
  let clusterEnd = -1;

  const flush = () => {
    for (const p of cluster) p.lanes = laneEnds.length;
    out.push(...cluster);
    cluster = [];
    laneEnds = [];
  };

  for (const item of items) {
    if (cluster.length && item.startMin >= clusterEnd) flush();

    let lane = laneEnds.findIndex((end) => end <= item.startMin);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.endMin);
    } else {
      laneEnds[lane] = item.endMin;
    }
    clusterEnd = Math.max(cluster.length ? clusterEnd : item.endMin, item.endMin);

    cluster.push({
      ...item,
      top: (item.startMin / 60) * hourHeight,
      height: Math.max(MIN_CARD_PX, ((item.endMin - item.startMin) / 60) * hourHeight),
      lane,
      lanes: 1,
    });
  }
  flush();
  return out;
}
