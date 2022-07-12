import { Subscription } from 'rxjs';

/**
  * Defines a custom decorator @AutoUnsubscribe()
  * @param targetComponent The component that the decorator is being used in
  * @param targetProperty The property that the decorator is being attached to
  */
 export function AutoUnsubscribe(targetComponent: any, targetProperty: string) {
  let subscriptions: Subscription[];

  if (!subscriptions) {
    subscriptions = [];

    // Reference the component's original ngOnDestroy function
    const ngOnDestroyRef = targetComponent.constructor.prototype.ngOnDestroy;

    // Define or Override the ngOnDestroy function on the targetComponent
    targetComponent.ngOnDestroy = function ngOnDestroy(): void {
      // If it exists, call the component's original ngOnDestroy function
      if (ngOnDestroyRef) ngOnDestroyRef.call(this);

      subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
      subscriptions = [];
    }
  }

  // Each time the targetProperty is assigned a value (subscription)
  // grab the value and add it to the subscriptions array
  Object.defineProperty(targetComponent, targetProperty, {
    set: (sub: Subscription) => {
      subscriptions.push(sub);
    }
  });
}