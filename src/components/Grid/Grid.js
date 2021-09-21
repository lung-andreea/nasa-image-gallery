import React from "react";
import PropTypes from "prop-types";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { columns: 1 };
    this.gridRef = React.createRef();
    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  getColumns(w) {
    return (
      this.props.brakePoints.reduceRight((p, c, i) => {
        return c < w ? p : i;
      }, this.props.brakePoints.length) + 1
    );
  }

  onResize() {
    const columns = this.getColumns(this.gridRef.current.offsetWidth);
    if (columns !== this.state.columns) {
      this.setState({ columns: columns });
    }
  }

  mapChildren() {
    let col = [];
    const numC = this.state.columns;
    for (let i = 0; i < numC; i++) {
      col.push([]);
    }
    return this.props.children.reduce((p, c, i) => {
      p[i % numC].push(c);
      return p;
    }, col);
  }

  render() {
    const classNames = ["grid"];
    if (this.props.loading) classNames.push("grid--loading");

    return (
      <div className={classNames.join(" ")} ref={this.gridRef}>
        {this.mapChildren().map((col, ci) => {
          return (
            <div className="column" key={ci}>
              {col.map((child, i) => {
                return child;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

Grid.propTypes = {
  brakePoints: PropTypes.arrayOf(PropTypes.number),
  loading: PropTypes.bool,
};

export default React.memo(Grid);
