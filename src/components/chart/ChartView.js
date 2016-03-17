import d3 from 'd3';

class Measure {
    constructor(model) {
        this.key = model.getProjectKey();
    }

    start(id) {
        console.log(`Rendering chart ${this.key}...`)
        performance.mark(`mark-${this.key}-${id}-start`);
    }

    end(id) {
        let prefix = `mark-${this.key}-${id}`;
        performance.mark(`${prefix}-end`);
        performance.measure(`${prefix}-measure`, `${prefix}-start`, `${prefix}-end`);
        
        let diff = performance.getEntriesByName(`${prefix}-measure`)[0].duration / 1000;
        console.log(`Rendering chart ${this.key}... done. (${diff.toFixed(2)}s)`)
    }
}


export default class ChartView {
    constructor() {
        this.jobId = 0;
        this.worker = new Worker("/build/ChartView.worker.bundle.js");
    }

    render(element, model) {
        return new Promise(resolve => {

            let parentWidth = parseInt(d3.select(element).style('width'), 10);
            let measure = new Measure(model);

            measure.start(this.jobId);

            this.worker.postMessage({
                id: this.jobId++,
                width: parentWidth,
                series: model.getSeriesData(),
                xDomain: model.getXDomain(),
                yDomain: model.getYDomain()
            });

            this.worker.onmessage = (event) => {

                measure.end(event.data.id);

                // resolve only last job
                if (event.data.id === this.jobId - 1) {
                    resolve(event.data.html);
                }
            };

        });
    }

}