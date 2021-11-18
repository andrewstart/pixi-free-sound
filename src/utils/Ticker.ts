interface Callback
{
    f: () => void;
    ctx: any;
}

class Ticker
{
    private _callbacks: Callback[] = [];
    private _frameCancel = 0;

    public add(callback: () => void, context?: any): void
    {
        this._callbacks.push({ f: callback, ctx: context });
    }

    public remove(callback: () => void, context?: any): void
    {
        for (let i = 0; i < this._callbacks.length; ++i)
        {
            if (this._callbacks[i].f === callback && this._callbacks[i].ctx === context)
            {
                this._callbacks.splice(i, 1);

                return;
            }
        }
    }

    public start(): void
    {
        if (!this._frameCancel)
        {
            this._frameCancel = requestAnimationFrame(this.update.bind(this));
        }
    }

    private update(): void
    {
        for (let i = this._callbacks.length - 1; i >= 0; --i)
        {
            this._callbacks[i].f.call(this._callbacks[i].ctx);
        }
    }

    public stop(): void
    {
        cancelAnimationFrame(this._frameCancel);
        this._frameCancel = 0;
    }
}

export const shared = new Ticker();
shared.start();
