import { of, from } from 'rxjs';
import { bufferCount, map, mergeMap } from 'rxjs/operators';

// mimic your first api call
const observable1$ = of([1, 2, 3]);

const observable2$ = observable1$.pipe(
  // must use mergeMap
  mergeMap((value) =>
    from(value).pipe(
      // must use mergeMap
      mergeMap((value) => {
        // mimic your second api call
        const observable3$ = of(['a' + value, 'b' + value, 'c' + value]);
        return observable3$.pipe(
          map((ob3) => {
            return {
              prop1: ob3,
              prop2: value,
            };
          })
        );
      }),
      // bufferCount operator help to construct an object array
      bufferCount(value.length)
    )
  )
);
// finally, you need to return observable2$ in your handler.

const subscribe = observable2$.subscribe((val) => console.log(val));
