import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '../../../lib/utils';
import { toggleVariants } from './toggle';

const ToggleGroupContext = React.createContext({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = React.forwardRef(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('flex items-center justify-center gap-1', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
);

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef(
  ({ className, children, variant, size, tooltipText, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext);
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <>
        <ToggleGroupPrimitive.Item
          ref={ref}
          className={cn(
            toggleVariants({
              variant: context.variant || variant,
              size: context.size || size,
            }),
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {children}
        </ToggleGroupPrimitive.Item>

        {isHovered && tooltipText && (
          <div className="absolute top-[106%] transform -translate-x-1/2 p-1 min-w-28 bg-gray-700 rounded-md text-[10px] text-white text-center z-[4] left-[130%]">
            {tooltipText}
          </div>
        )}
      </>
    );
  }
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
