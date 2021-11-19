import { TinyEmitter } from 'tiny-emitter';

export class EventEmitter extends TinyEmitter
{
    /**
     * Internal callback storage by event as used by tiny-emitter
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    protected e: {[name:string]: {fn: (...args: any[]) => void, ctx: any}[]};

    public removeAllListeners(): void
    {
        this.e = {};
    }

    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-module-boundary-types
    public off(name: string, callback?: (...args: any[]) => void, ctx?: any): this
    {
        const e = this.e || (this.e = {});
        const evts = e[name];
        const liveEvents = [];

        if (evts && callback)
        {
            for (let i = 0, len = evts.length; i < len; i++)
            {
                if ((evts[i].fn !== callback && (evts[i].fn as any)._ !== callback) || evts[i].ctx !== ctx)
                {
                    liveEvents.push(evts[i]);
                }
            }
        }

        // Remove event from queue to prevent memory leak
        if (liveEvents.length)
        {
            e[name] = liveEvents;
        }
        else
        {
            delete e[name];
        }

        return this;
    }
}
