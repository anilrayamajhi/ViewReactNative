import React, { Component } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import imageExists from "image-exists";

function PostTile({ post }) {
  return (
    <View>
      <View style={styles.post}>
        <Image
          accessibilityLabel={post.title}
          source={{
            uri: post.imageURL
          }}
          style={styles.postImg}
        />
      </View>
      <View style={styles.postTitle}>
        <Text style={styles.primary}>{post.title}</Text>
        <Text style={styles.secondary}>{post.subtitle}</Text>
      </View>
    </View>
  );
}

class App extends Component {
  _isMounted = false;
  state = {
    posts: [],
    loading: true
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(
        "https://gist.githubusercontent.com/chrisbull/1f30198bf292e8cac839d8c28f6896f2/raw/6836df6abd781f26528eceb98d28a3f03c68e58b/tiles.json"
      )
      .then(response => {
        if (response.statusText === "OK") {
          if (this._isMounted) {
            this.setState({ posts: response.data.response, loading: false });
          }
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  validateImage = image_url => {
    let validator = false;
    imageExists(image_url, function(exists) {
      if (exists) {
        validator = true;
      } else {
        validator = false;
      }
    });

    return validator;
  };

  renderPosts = post => {
    return <PostTile key={post.id} post={post} />;
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator style={styles.app} color="#000000" />;
    }

    const { posts } = this.state;
    return (
      <View style={styles.app}>
        <View style={styles.header}>
          <Text style={styles.title}>Title</Text>
        </View>

        {posts.map(this.renderPosts)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    margin: "0.5rem"
  },
  post: {
    marginTop: "1rem",
    height: 140
  },
  postImg: {
    height: "100%",
    borderRadius: 10,
    boxShadow: "5px 5px 10px #888888"
  },
  postTitle: {
    position: "absolute",
    bottom: 10,
    left: 12
  },
  primary: {
    color: "#FFFFFF",
    fontSize: 15
  },
  secondary: {
    color: "#dadada",
    fontSize: 12
  },
  header: {
    paddingTop: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
