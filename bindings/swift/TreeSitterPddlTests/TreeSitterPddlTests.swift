import XCTest
import SwiftTreeSitter
import TreeSitterPddl

final class TreeSitterPddlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_pddl())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading PDDL grammar")
    }
}
